
# NBA Analytics API - MongoDB Atlas Cloud Version

A professional Express.js API for handling NBA player analysis data using MongoDB Atlas cloud database with Mongoose ODM.

## 🏗️ Architecture

- **Framework**: Express.js with professional middleware
- **Database**: MongoDB Atlas (Cloud-hosted, managed service)
- **ODM**: Mongoose for schema validation and data modeling
- **Data Storage**: Document-based storage with automatic timestamps
- **API Style**: RESTful JSON API with comprehensive error handling
- **Security**: CORS enabled, input validation, and sanitization

## 📋 Prerequisites

Before running this API, ensure you have:

1. **Node.js** (v14 or higher)
2. **npm** (Node Package Manager) 
3. **MongoDB Atlas Account** (Free tier available)
4. **Environment Configuration** (.env file setup)

### MongoDB Atlas Setup (No Local Installation Required)

#### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Sandbox tier is free)

#### Step 2: Configure Network Access
1. Go to "Network Access" in the Atlas dashboard
2. Click "Add IP Address"
3. Either add your current IP or use `0.0.0.0/0` for development
4. Wait 1-2 minutes for changes to take effect

#### Step 3: Create Database User
1. Go to "Database Access" in the Atlas dashboard
2. Click "Add New Database User"
3. Create username and password (save these for connection string)
4. Grant "Read and write to any database" permissions

#### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Configure Environment Variables
```bash
# Create .env file in the api directory
touch .env

# Add your MongoDB Atlas connection string:
echo "MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nba-analytics?retryWrites=true&w=majority" >> .env
echo "PORT=3000" >> .env
```

**Example .env file:**
```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/nba-analytics?retryWrites=true&w=majority&appName=Cluster0

# Server Configuration  
PORT=3000
```

### 3. Test Database Connection
```bash
# Test MongoDB Atlas connectivity
node test-connection.js
```

This will:
- Verify MongoDB Atlas connection
- Test authentication and network access
- Display connection diagnostics
- Provide troubleshooting guidance if connection fails

### 4. Initialize Database (Optional)
```bash
# Set up database with initial data (optional)
npm run migrate
```

This will:
- Connect to MongoDB Atlas
- Verify the Vote model schema
- Create necessary indexes for optimal performance
- Display database statistics and health check

### 5. Start the NBA Analytics API Server
```bash
# Production mode
npm start

# Development mode (with auto-restart on file changes)
npm run dev
```

**Expected Output:**
```
Connecting to MongoDB...
MongoDB URI: mongodb+srv://username:****@cluster0.xxxxx.mongodb.net/nba-analytics
✅ Connected to MongoDB successfully
Database: nba-analytics
✅ Database connection initialized
Vote API listening on http://localhost:3000
```

The NBA Analytics API will be available at `http://localhost:3000`

## 📊 Database Schema

### Player Analysis Document Structure
```javascript
{
  _id: ObjectId,           // MongoDB unique identifier
  player: String,          // Player name (required, max 100 chars, trimmed)
  createdAt: Date,         // Automatic timestamp (when analysis was submitted)
  updatedAt: Date          // Automatic timestamp (when analysis was last modified)
}
```

**Schema Validation:**
- `player`: Required field, string type, maximum 100 characters
- Automatic timestamps managed by Mongoose
- Indexed on `player` field for efficient aggregation queries
- Indexed on `createdAt` for time-based analytics

### Indexes
- `player` (ascending) - For efficient vote aggregation
- `createdAt` (descending) - For time-based queries

## 🔌 API Endpoints

### Create a Vote
```http
POST /api/votes
Content-Type: application/json

{
  "player": "michael-jordan",
  "otherName": "Custom Player Name"
}
```

**Response:**
```json
{
  "ok": true,
  "id": "507f1f77bcf86cd799439011",
  "player": "michael-jordan",
  "createdAt": "2025-09-09T10:30:00.000Z"
}
```

### Get Vote Results
```http
GET /api/votes
```

**Response:**
```json
{
  "ok": true,
  "results": [
    {"player": "michael-jordan", "count": 15},
    {"player": "lebron-james", "count": 12},
    {"player": "stephen-curry", "count": 8}
  ],
  "total": 35
}
```

### Get Total Vote Count
```http
GET /api/votes/count
```

**Response:**
```json
{
  "ok": true,
  "totalVotes": 35
}
```

### Get Recent Votes
```http
GET /api/votes/recent
```

**Response:**
```json
{
  "ok": true,
  "recentAnalyses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "player": "lebron-james", 
      "createdAt": "2025-09-16T10:30:00.000Z"
    }
  ]
}
```

### Health Check
```http
GET /
```

**Response:**
```json
{
  "ok": true,
  "message": "NBA Analytics API with MongoDB Atlas",
  "database": {
    "status": "connected",
    "name": "nba-analytics"
  },
  "version": "1.0.0",
  "timestamp": "2025-09-16T10:30:00.000Z"
}
```

## 🔧 Development

### Project Structure
```
api/
├── src/
│   ├── models/
│   │   └── Vote.js         # Mongoose player analysis model
│   ├── controllers/
│   │   └── votes.js        # Analytics logic handlers
│   ├── routes/
│   │   └── votes.js        # API route definitions
│   ├── app.js              # Express app configuration
│   ├── db.js               # MongoDB Atlas connection setup
│   ├── migrate.js          # Database initialization
│   └── server.js           # Application entry point
├── test-connection.js      # MongoDB Atlas connection test
├── package.json            # Dependencies and scripts
├── .env                    # Environment configuration (not in Git)
└── env.template           # Environment configuration template
```

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
npm run migrate    # Initialize database with sample data
node test-connection.js  # Test MongoDB Atlas connection
```

## 🚨 Troubleshooting

### MongoDB Atlas Connection Issues

#### Error: "Could not connect to any servers"
**Cause:** IP address not whitelisted in MongoDB Atlas
**Solution:**
1. Go to MongoDB Atlas dashboard → Network Access
2. Click "Add IP Address" 
3. Add your current IP or use `0.0.0.0/0` for development
4. Wait 1-2 minutes for changes to take effect

#### Error: "Authentication failed"
**Cause:** Incorrect username/password in connection string
**Solution:**
1. Verify database user credentials in Atlas dashboard
2. Check that password doesn't contain special characters requiring URL encoding
3. Ensure user has proper database permissions

#### Error: "Server selection timed out"
**Cause:** Network connectivity or cluster paused
**Solution:**
1. Check internet connection
2. Verify MongoDB Atlas cluster is running (not paused)
3. Try connection test: `node test-connection.js`

### Development Tips
```bash
# View detailed error logs
npm start

# Test API endpoints manually
curl -X GET http://localhost:3000/api/votes
curl -X POST http://localhost:3000/api/votes -H "Content-Type: application/json" -d '{"player":"test-player"}'

# Monitor MongoDB Atlas metrics
# Use Atlas dashboard → Metrics tab for performance monitoring
```

## 🌐 Production Deployment

### Environment Variables for Production
```env
# Production MongoDB Atlas connection
MONGODB_URI=mongodb+srv://prod-user:secure-password@prod-cluster.xxxxx.mongodb.net/nba-analytics-prod?retryWrites=true&w=majority

# Production server port
PORT=3000

# Optional: Node environment
NODE_ENV=production
```

### Performance Considerations
- **Connection Pooling**: Configured with maxPoolSize: 10
- **Database Indexing**: Automatic indexes on player and createdAt fields
- **Error Handling**: Comprehensive error logging and user-friendly responses
- **CORS**: Configured for cross-origin requests from frontend

### Security Best Practices
- Environment variables for sensitive data
- Input validation and sanitization
- MongoDB Atlas built-in security features
- Regular dependency updates with `npm audit`

---

## 📄 License

This project is licensed under the MIT License.

---

*NBA Analytics API - Professional Basketball Analytics Platform*  
*Powered by MongoDB Atlas Cloud Database*  
*Built with Express.js and Mongoose ODM*

### Available Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with auto-reload
npm run init-db  # Initialize database and create indexes
npm run migrate  # Alias for init-db
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# Windows: Start MongoDB service from Services
# macOS: brew services start mongodb/brew/mongodb-community
# Linux: sudo systemctl start mongod
```

### Common Errors

**Error: `ECONNREFUSED`**
- MongoDB is not running
- Wrong connection string
- Firewall blocking connection

**Error: `Authentication failed`**
- Incorrect MongoDB credentials
- Database access permissions

---

## 🎯 MongoDB Implementation

This application uses MongoDB Atlas for modern cloud-based data storage with excellent scalability and performance. The API provides the same endpoints for seamless frontend integration while leveraging MongoDB's document-based architecture.
