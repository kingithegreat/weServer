// Load environment variables from .env file (if it exists)
// This allows configuration through environment variables
require('dotenv').config();

// Import the main Express application from app.js
const app = require('./app');

// Set the port - use PORT from environment variables, or default to 3001
// This allows deployment platforms to set their own port
const port = process.env.PORT || 3001;

// Start the HTTP server and listen on the specified port
// This makes the API accessible at http://localhost:3001
app.listen(port, () => {
  // Log a message when the server starts successfully
  // This confirms the server is running and shows the URL
  console.log(`Vote API listening on http://localhost:${port}`);
});
