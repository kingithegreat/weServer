# 🚀 Setup Instructions for Vote Your GOAT (MongoDB Version)

## Prerequisites Check ✅

Before starting, ensure you have:

### 1. Node.js and npm
```bash
# Check if Node.js is installed
node --version
# Should show v14.0.0 or higher

# Check if npm is installed  
npm --version
# Should show 6.0.0 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. MongoDB Installation

#### Windows:
1. **Download**: Go to [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. **Install**: Run the installer with default settings
3. **Start Service**: 
   - Open Services app (`services.msc`)
   - Find "MongoDB Server" and start it
   - Or run in terminal: `mongod`

#### macOS:
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Verify installation
brew services list | grep mongodb
```

#### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. Verify MongoDB is Running
```bash
# Test MongoDB connection
mongo --eval "db.adminCommand('ismaster')"

# Should show connection info without errors
```

---

## 🛠️ Application Setup

### Step 1: Install Dependencies
```bash
# Navigate to the API directory
cd "c:\Users\adenk\Desktop\level 7\web\website\vote-your-goat\api"

# Install all required packages
npm install
```

**Expected packages installed:**
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `nodemon` - Development auto-restart (dev dependency)

### Step 2: Environment Configuration (Optional)
```bash
# Copy environment template
copy env.template .env

# Edit .env file if needed (optional - defaults work for local development)
notepad .env
```

**Default Configuration:**
- MongoDB URI: `mongodb://localhost:27017/vote-your-goat`
- Server Port: `3001`
- Environment: `development`

### Step 3: Initialize Database
```bash
# Run database initialization
npm run init-db
```

**This command will:**
- ✅ Connect to MongoDB
- ✅ Create the `vote-your-goat` database
- ✅ Set up the `votes` collection
- ✅ Create performance indexes
- ✅ Test the Vote model
- ✅ Display database statistics

**Expected output:**
```
🚀 Starting MongoDB initialization...
📡 Connecting to MongoDB...
✅ Connected to database: vote-your-goat
📊 Creating database indexes...
✅ Created index on player field
✅ Created index on createdAt field
🧪 Testing Vote model...
✅ Vote model is working correctly
✅ Test vote cleaned up
🎉 MongoDB initialization completed successfully!
```

### Step 4: Start the API Server
```bash
# For production use:
npm start

# For development (auto-restart on changes):
npm run dev
```

**Success indicators:**
- Console shows: `Vote API listening on http://localhost:3001`
- Console shows: `✅ Connected to MongoDB successfully`
- No error messages

### Step 5: Test the API
Open a new terminal and test the endpoints:

```bash
# Test health check
curl http://localhost:3001

# Expected response:
# {"ok":true,"message":"Vote Your GOAT API with MongoDB","database":{"status":"connected","name":"vote-your-goat"}}
```

---

## 🧪 Verify Everything Works

### 1. Test Vote Submission
```bash
# Submit a test vote
curl -X POST http://localhost:3001/api/votes \
  -H "Content-Type: application/json" \
  -d '{"player":"michael-jordan"}'

# Expected response:
# {"ok":true,"id":"...","player":"michael-jordan","createdAt":"..."}
```

### 2. Test Results Retrieval
```bash
# Get vote results
curl http://localhost:3001/api/votes

# Expected response:
# {"ok":true,"results":[{"player":"michael-jordan","count":1}],"total":1}
```

### 3. Test Frontend
1. **Open** `index.html` in your web browser
2. **Select** a player and click "Vote"
3. **Verify** you're redirected to results page
4. **Check** that your vote appears in the results

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: `ECONNREFUSED`**
```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ismaster')"

# If not running, start it:
# Windows: Start MongoDB service or run `mongod`
# macOS: brew services start mongodb/brew/mongodb-community
# Linux: sudo systemctl start mongod
```

**Error: `command not found: mongo`**
```bash
# MongoDB shell might not be in PATH
# Try connecting via application:
node -e "require('mongoose').connect('mongodb://localhost:27017/test').then(() => console.log('Connected')).catch(console.error)"
```

### Application Issues

**Error: `Cannot find module`**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error: `Port 3001 already in use`**
```bash
# Find and kill process using port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# macOS/Linux:
lsof -ti:3001 | xargs kill -9
```

**Frontend shows "ERR_CONNECTION_REFUSED"**
- Ensure API server is running (`npm start`)
- Check console for error messages
- Verify URL in browser console matches `http://localhost:3001`

---

## 📊 Database Management

### View Data in MongoDB
```bash
# Connect to MongoDB shell
mongo

# Switch to vote database
use vote-your-goat

# View all votes
db.votes.find().pretty()

# Count total votes
db.votes.countDocuments()

# Group votes by player
db.votes.aggregate([
  { $group: { _id: "$player", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

### Backup Database
```bash
# Create backup
mongodump --db vote-your-goat --out ./backup

# Restore backup
mongorestore ./backup
```

### Reset Database
```bash
# Clear all votes (if needed)
mongo vote-your-goat --eval "db.votes.deleteMany({})"

# Or drop entire database
mongo vote-your-goat --eval "db.dropDatabase()"
```

---

## 🎯 Next Steps

1. **✅ API Server Running**: Check `http://localhost:3001`
2. **✅ Frontend Working**: Test voting functionality
3. **✅ Database Persisting**: Restart server and verify votes remain
4. **✅ Live Updates**: Watch results page update automatically

### Development Workflow
```bash
# Make changes to code
# Server automatically restarts (if using npm run dev)
# Refresh browser to see changes
# Check console for any errors
```

### Production Considerations
- Set up MongoDB Atlas for cloud hosting
- Configure environment variables for production
- Set up monitoring and logging
- Implement rate limiting and security measures

---

**🎉 You're all set! Your Vote Your GOAT application is now running with MongoDB!**

For any issues, check the console output and refer to the troubleshooting section above.
