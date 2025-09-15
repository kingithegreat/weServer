// MongoDB database connection using Mongoose
// This file handles the connection to MongoDB and provides connection management

// Import Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// MongoDB connection configuration
// Default to local MongoDB instance, can be overridden with environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vote-your-goat';

// Connection options for better reliability and performance
const connectionOptions = {
  // Automatically create indexes defined in schemas
  autoIndex: true,
  
  // Connection pool settings for better performance
  maxPoolSize: 10,        // Maximum number of connections in pool
  serverSelectionTimeoutMS: 5000,  // How long to try selecting a server
  socketTimeoutMS: 45000, // How long a send or receive on a socket can take
  
  // Database name (will be created automatically if it doesn't exist)
  dbName: 'vote-your-goat'
};

// Connection state tracking
let isConnected = false;

// Initialize MongoDB connection
// Returns a promise that resolves when connection is established
async function connectToDatabase() {
  // Return existing connection if already connected
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection;
  }

  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', MONGODB_URI);
    
    // Establish connection to MongoDB
    await mongoose.connect(MONGODB_URI, connectionOptions);
    
    // Mark as connected
    isConnected = true;
    
    console.log('✅ Connected to MongoDB successfully');
    console.log('Database:', mongoose.connection.db.databaseName);
    
    // Return the connection object
    return mongoose.connection;
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Log additional details for debugging
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure MongoDB is running on your system');
      console.error('Start MongoDB with: mongod');
    }
    
    // Re-throw error so calling code can handle it
    throw error;
  }
}

// Handle connection events for better monitoring
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
  isConnected = false;
});

// Graceful shutdown handling
// Close database connection when application terminates
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

// Export the connection function and connection status
module.exports = {
  connectToDatabase,
  
  // Get current connection status
  isConnected: () => isConnected,
  
  // Get the mongoose instance for direct access if needed
  mongoose,
  
  // Get the connection object
  getConnection: () => mongoose.connection
};
