// MongoDB database initialization script
// This script sets up the database connection, creates indexes, and validates the setup
// Run this once before starting the server to ensure MongoDB is properly configured

// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const { connectToDatabase, mongoose } = require('./db');  // Database connection
const Vote = require('./models/Vote');                    // Vote model

// Main initialization function
// Sets up database connection and creates necessary indexes
async function initializeDatabase() {
  try {
    console.log('🚀 Starting MongoDB initialization...');
    
    // Step 1: Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await connectToDatabase();
    
    // Step 2: Get database information
    const db = mongoose.connection.db;
    console.log(`✅ Connected to database: ${db.databaseName}`);
    
    // Step 3: Create indexes for better performance
    console.log('📊 Creating database indexes...');
    
    // Create index on player field for faster grouping operations
    await Vote.collection.createIndex({ player: 1 });
    console.log('✅ Created index on player field');
    
    // Create index on createdAt field for time-based queries
    await Vote.collection.createIndex({ createdAt: -1 });
    console.log('✅ Created index on createdAt field');
    
    // Step 4: Verify the Vote model is working
    console.log('🧪 Testing Vote model...');
    
    // Test creating a sample vote (will be removed)
    const testVote = new Vote({ player: 'test-initialization' });
    const savedVote = await testVote.save();
    console.log('✅ Vote model is working correctly');
    
    // Remove the test vote
    await Vote.deleteOne({ _id: savedVote._id });
    console.log('✅ Test vote cleaned up');
    
    // Step 5: Display collection statistics
    const stats = await Vote.collection.stats().catch(() => null);
    if (stats) {
      console.log('📈 Collection statistics:');
      console.log(`   - Document count: ${stats.count || 0}`);
      console.log(`   - Storage size: ${stats.storageSize || 0} bytes`);
      console.log(`   - Index count: ${stats.nindexes || 0}`);
    }
    
    // Step 6: Show existing vote count
    const existingVotes = await Vote.countDocuments();
    console.log(`📊 Existing votes in database: ${existingVotes}`);
    
    console.log('🎉 MongoDB initialization completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Start the API server: npm start');
    console.log('2. Open the voting page in your browser');
    console.log('');
    
  } catch (error) {
    console.error('❌ MongoDB initialization failed:', error.message);
    
    // Provide helpful error messages for common issues
    if (error.message.includes('ECONNREFUSED')) {
      console.error('');
      console.error('💡 MongoDB connection refused. Please check:');
      console.error('   - Is MongoDB installed?');
      console.error('   - Is MongoDB running? (try: mongod)');
      console.error('   - Is it running on the default port 27017?');
      console.error('');
    } else if (error.message.includes('authentication')) {
      console.error('');
      console.error('💡 Authentication failed. Please check:');
      console.error('   - MongoDB credentials in environment variables');
      console.error('   - Database access permissions');
      console.error('');
    }
    
    // Exit with error code
    process.exit(1);
  }
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('\n🛑 Received interrupt signal, closing database connection...');
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    process.exit(1);
  }
});

// Run the initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      // Close connection after successful initialization
      setTimeout(async () => {
        await mongoose.connection.close();
        console.log('✅ Database connection closed');
        process.exit(0);
      }, 1000);
    })
    .catch((error) => {
      console.error('❌ Initialization failed:', error);
      process.exit(1);
    });
}

// Export the function for use in other modules
module.exports = {
  initializeDatabase
};
