// Controller for handling vote-related API requests using Mongoose/MongoDB
// Controllers contain the business logic for processing requests and responses.
// This module has two main functions:
// - createVote: accepts and saves incoming votes to MongoDB
// - getResults: retrieves and returns aggregated vote statistics from MongoDB
//
// Data Flow Summary:
// 1. Frontend sends vote → createVote → saves to MongoDB → returns success
// 2. Frontend requests results → getResults → queries MongoDB → returns vote counts

// Import the Vote model for database operations
const Vote = require('../models/Vote');

// Handler for POST /api/votes
// Purpose: Accept a vote from the frontend and save it to MongoDB
// Expected input: JSON body with { player: string, otherName?: string }
// Response: { ok: true, id: string } on success, error object on failure
exports.createVote = async (req, res) => {
  try {
    // Extract vote data from the request body
    // player: the selected player (e.g., "michael-jordan", "other")
    // otherName: if player === "other", this contains the custom name
    const { player, otherName } = req.body;

    // Validate that player field is provided
    if (!player) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Player field is required' 
      });
    }

    // Determine the final player name to store:
    // - If user selected "other", use their custom name (or "Other" if empty)
    // - Otherwise, use the selected player value
    const playerName = player === 'other' ? (otherName || 'Other') : player;

    // Create a new vote document using Mongoose model
    const vote = new Vote({
      player: playerName
    });

    // Save the vote to MongoDB
    // Mongoose handles validation and returns the saved document
    const savedVote = await vote.save();

    // Send success response with HTTP status 201 (Created)
    // Include the MongoDB-generated ID for reference
    res.status(201).json({ 
      ok: true, 
      id: savedVote._id.toString(),
      player: savedVote.player,
      createdAt: savedVote.createdAt
    });

  } catch (err) {
    // Handle different types of errors
    console.error('Error creating vote:', err);

    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid vote data',
        details: err.message
      });
    }

    // MongoDB connection or other errors
    res.status(500).json({ 
      ok: false, 
      error: 'Internal server error' 
    });
  }
};

// Handler for GET /api/votes
// Purpose: Retrieve aggregated vote statistics for display on results page
// Expected input: none (GET request, no body)
// Response: { ok: true, results: Array<{player: string, count: number}> }
exports.getResults = async (req, res) => {
  try {
    // Use the custom static method from Vote model to get aggregated results
    // This performs MongoDB aggregation to group votes by player and count them
    const results = await Vote.getResults();

    // Send the results as JSON
    // The frontend expects an array of objects with player names and vote counts
    res.json({ 
      ok: true, 
      results: results,
      total: results.reduce((sum, result) => sum + result.count, 0)
    });

  } catch (err) {
    // Handle any errors (database connection, aggregation errors, etc.)
    console.error('Error getting results:', err);

    // Send error response with HTTP status 500 (Internal Server Error)
    res.status(500).json({ 
      ok: false, 
      error: 'Failed to retrieve vote results' 
    });
  }
};

// Additional handler for getting total vote count (optional enhancement)
// GET /api/votes/count - Returns just the total number of votes
exports.getTotalVotes = async (req, res) => {
  try {
    // Count total number of vote documents in the collection
    const totalVotes = await Vote.countDocuments();

    res.json({
      ok: true,
      totalVotes: totalVotes
    });

  } catch (err) {
    console.error('Error getting total votes:', err);
    res.status(500).json({
      ok: false,
      error: 'Failed to get total vote count'
    });
  }
};

// Handler for getting recent votes (optional enhancement)
// GET /api/votes/recent - Returns the most recent votes with timestamps
exports.getRecentVotes = async (req, res) => {
  try {
    // Get the 10 most recent votes, sorted by creation time
    const recentVotes = await Vote.find()
      .sort({ createdAt: -1 })  // Sort by newest first
      .limit(10)                // Limit to 10 results
      .select('player createdAt')  // Only return player and timestamp fields
      .lean();                  // Return plain JavaScript objects for better performance

    res.json({
      ok: true,
      recentVotes: recentVotes
    });

  } catch (err) {
    console.error('Error getting recent votes:', err);
    res.status(500).json({
      ok: false,
      error: 'Failed to get recent votes'
    });
  }
};
