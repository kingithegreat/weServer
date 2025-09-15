// Mongoose model for Vote documents
// This file defines the structure and schema for vote data in MongoDB

// Import Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the vote schema with field types and validation rules
const voteSchema = new mongoose.Schema({
  // Player name field - stores the selected player or custom name
  player: {
    type: String,           // Data type: text string
    required: true,         // Field is mandatory
    trim: true,            // Remove whitespace from start/end
    maxlength: 100         // Limit to 100 characters for security
  }
}, {
  // Schema options for automatic timestamp management
  timestamps: true,        // Automatically add createdAt and updatedAt fields
  
  // Collection options
  collection: 'votes'      // Explicitly name the MongoDB collection
});

// Add indexes for better query performance
// Index on player field for faster GROUP BY operations in aggregation
voteSchema.index({ player: 1 });

// Index on createdAt for time-based queries (newest first, etc.)
voteSchema.index({ createdAt: -1 });

// Static method to get aggregated vote results
// This uses MongoDB aggregation pipeline for efficient vote counting
voteSchema.statics.getResults = function() {
  return this.aggregate([
    // Group votes by player name and count occurrences
    {
      $group: {
        _id: '$player',           // Group by player field
        count: { $sum: 1 },      // Count documents in each group
        player: { $first: '$player' }  // Include player name in output
      }
    },
    
    // Sort by vote count in descending order (most votes first)
    {
      $sort: { count: -1 }
    },
    
    // Clean up the output format to match expected API response
    {
      $project: {
        _id: 0,                   // Exclude MongoDB's _id field
        player: 1,               // Include player name
        count: 1                 // Include vote count
      }
    }
  ]);
};

// Instance method to validate player names (optional enhancement)
voteSchema.methods.isValidPlayer = function() {
  // List of predefined valid players (can be expanded)
  const validPlayers = [
    'michael-jordan',
    'lebron-james', 
    'stephen-curry',
    'kareem-abdul-jabbar',
    'magic-johnson',
    'other'
  ];
  
  // Allow any player name if it's "other" or in the predefined list
  return this.player === 'other' || 
         validPlayers.includes(this.player) || 
         this.player.length > 0;
};

// Create and export the Vote model
// This model provides methods for CRUD operations on vote documents
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
