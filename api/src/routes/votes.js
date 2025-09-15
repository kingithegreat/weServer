// Routes definition for vote-related endpoints using MongoDB/Mongoose
// This file defines the URL patterns and connects them to controller functions

// Import required modules
const express = require('express');           // Express framework
const router = express.Router();              // Create a router instance
const controller = require('../controllers/votes'); // Import vote controller functions

// Define route handlers:

// POST /api/votes - Create a new vote
// When someone submits a vote from the frontend, this route handles it
// The actual logic is in controller.createVote
router.post('/', controller.createVote);

// GET /api/votes - Retrieve vote results/statistics
// When the results page needs to display vote counts, this route provides the data
// The actual logic is in controller.getResults
router.get('/', controller.getResults);

// GET /api/votes/count - Get total vote count (optional enhancement)
// Returns just the total number of votes cast
router.get('/count', controller.getTotalVotes);

// GET /api/votes/recent - Get recent votes with timestamps (optional enhancement)
// Returns the most recent votes for activity monitoring
router.get('/recent', controller.getRecentVotes);

// Export the router so it can be used by app.js
// app.js will mount this router at /api/votes, so:
// - POST /api/votes calls controller.createVote
// - GET /api/votes calls controller.getResults
// - GET /api/votes/count calls controller.getTotalVotes
// - GET /api/votes/recent calls controller.getRecentVotes
module.exports = router;
