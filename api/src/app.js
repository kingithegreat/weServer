// Main Express app configuration with MongoDB/Mongoose integration

// Import required modules
const express = require('express');  // Web framework for Node.js
const cors = require('cors');        // Cross-Origin Resource Sharing middleware
const votes = require('./routes/votes'); // Import vote-related routes
const { connectToDatabase } = require('./db'); // Import MongoDB connection function

// Create an Express application instance
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
// This allows the frontend (HTML pages) to make requests to this API
// even if they're served from a different origin (like file:// URLs)
app.use(cors());

// Enable JSON request body parsing
// This middleware parses incoming JSON requests and makes the data
// available in req.body for route handlers
app.use(express.json());

// Add request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize MongoDB connection when the app starts
// This ensures database connectivity before handling requests
async function initializeDatabase() {
  try {
    await connectToDatabase();
    console.log('✅ Database connection initialized');
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    console.error('Make sure MongoDB is running and accessible');
    // Don't exit - let the app start but log the error
    // Individual routes will handle database connection errors
  }
}

// Initialize database connection
initializeDatabase();

// Mount the votes router at /api/votes
// All routes defined in ./routes/votes will be prefixed with /api/votes
// For example: POST /api/votes, GET /api/votes, GET /api/votes/count
app.use('/api/votes', votes);

// Simple health check route to verify the server is running
// GET / returns basic server information and database status
app.get('/', async (req, res) => {
  try {
    // Check database connection status
    const { mongoose } = require('./db');
    const dbStatus = mongoose.connection.readyState;
    
    // Connection states: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbStatusText = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    }[dbStatus] || 'unknown';

    res.json({ 
      ok: true, 
      message: 'Vote Your GOAT API with MongoDB',
      database: {
        status: dbStatusText,
        name: mongoose.connection.db?.databaseName || 'N/A'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      ok: true,
      message: 'Vote Your GOAT API with MongoDB',
      database: {
        status: 'error',
        error: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
// This catches any unhandled errors in route handlers
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    ok: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Export the app so it can be imported by server.js
module.exports = app;
