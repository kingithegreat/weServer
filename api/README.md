
# Vote Your GOAT API - MongoDB Version

A simple Express.js API for handling basketball GOAT votes using MongoDB with Mongoose.

## 🏗️ Architecture

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Data Storage**: Document-based storage with automatic timestamps
- **API Style**: RESTful JSON API

## 📋 Prerequisites

Before running this API, ensure you have:

1. **Node.js** (v14 or higher)
2. **npm** (Node Package Manager)
3. **MongoDB** (v4.4 or higher)

### Installing MongoDB

#### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Follow the installation wizard
3. Start MongoDB service or run `mongod` in terminal

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongod
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Configure Environment (Optional)
```bash
# Copy the environment template
cp env.template .env

# Edit .env file to customize settings
# Default MongoDB URI: mongodb://localhost:27017/vote-your-goat
```

### 3. Initialize Database
```bash
# Set up MongoDB connection and indexes
npm run init-db
```

This will:
- Connect to MongoDB
- Create necessary indexes for performance
- Verify the Vote model is working
- Display database statistics

### 4. Start the API Server
```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The API will be available at `http://localhost:3001`

## 📊 Database Schema

### Vote Document Structure
```javascript
{
  _id: ObjectId,           // MongoDB unique identifier
  player: String,          // Player name (required, max 100 chars)
  createdAt: Date,         // Automatic timestamp (when vote was created)
  updatedAt: Date          // Automatic timestamp (when vote was last modified)
}
```

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
  "recentVotes": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "player": "lebron-james",
      "createdAt": "2025-09-09T10:30:00.000Z"
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
  "message": "Vote Your GOAT API with MongoDB",
  "database": {
    "status": "connected",
    "name": "vote-your-goat"
  },
  "timestamp": "2025-09-09T10:30:00.000Z"
}
```

## 🔧 Development

### Project Structure
```
api/
├── src/
│   ├── models/
│   │   └── Vote.js         # Mongoose vote model
│   ├── controllers/
│   │   └── votes.js        # Vote logic handlers
│   ├── routes/
│   │   └── votes.js        # API route definitions
│   ├── app.js              # Express app configuration
│   ├── db.js               # MongoDB connection setup
│   ├── migrate.js          # Database initialization
│   └── server.js           # Application entry point
├── package.json            # Dependencies and scripts
└── env.template           # Environment configuration template
```

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
