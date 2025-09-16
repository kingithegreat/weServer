// MongoDB Atlas Connection Test Script
// This script tests the connection to MongoDB Atlas and helps diagnose issues

require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB Atlas Connection...');
console.log('📍 MongoDB URI:', MONGODB_URI.replace(/:[^:@]*@/, ':****@')); // Hide password

async function testConnection() {
  try {
    // Set connection timeout to be more generous
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    };

    console.log('⏳ Attempting to connect...');
    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test basic database operations
    console.log('🧪 Testing database operations...');
    
    // Get database info
    const db = mongoose.connection.db;
    const admin = db.admin();
    const result = await admin.ping();
    console.log('📡 Ping successful:', result);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    // Test creating a simple document
    const testCollection = db.collection('connection_test');
    const testDoc = await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Connection test successful' 
    });
    console.log('📝 Test document created with ID:', testDoc.insertedId);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: testDoc.insertedId });
    console.log('🧹 Test document cleaned up');
    
    console.log('🎉 All tests passed! MongoDB Atlas is working correctly.');
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('\n💡 Possible solutions:');
      console.log('1. Add your current IP address to MongoDB Atlas whitelist');
      console.log('2. Go to Network Access in MongoDB Atlas dashboard');
      console.log('3. Click "Add IP Address" and add 0.0.0.0/0 for development');
      console.log('4. Wait 1-2 minutes for changes to take effect');
    }
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 Authentication issue:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Make sure the database user has proper permissions');
      console.log('3. Check if the password contains special characters that need encoding');
    }
    
    if (error.message.includes('timeout')) {
      console.log('\n💡 Timeout issue:');
      console.log('1. Check your internet connection');
      console.log('2. Try again in a few moments');
      console.log('3. Check if MongoDB Atlas cluster is paused');
    }
    
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    }
    process.exit(0);
  }
}

// Run the test
testConnection();