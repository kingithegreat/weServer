# NBA Analytics - Quick Setup Guide

## 🚀 Getting Started with NBA Analytics Platform

This guide will help you set up and run the NBA Analytics platform on your local machine in just a few minutes.

## ✅ Prerequisites Checklist

Before starting, ensure you have:
- [ ] **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- [ ] **MongoDB Atlas Account** (Free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- [ ] **Git** (optional, for version control)
- [ ] **Web Browser** (Chrome, Firefox, Safari, or Edge)

## 🏗️ System Overview

**NBA Analytics** consists of:
1. **Frontend** - Professional web interface (HTML/CSS/JavaScript)
2. **Backend API** - Express.js server with MongoDB Atlas
3. **Database** - Cloud-hosted MongoDB Atlas

## 📋 Step-by-Step Setup

### Step 1: MongoDB Atlas Configuration (5 minutes)

1. **Create MongoDB Atlas Account:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create new project called "NBA Analytics"

2. **Create Database Cluster:**
   - Click "Build a Database"
   - Choose "M0 Sandbox" (Free tier)
   - Select your preferred cloud region
   - Name your cluster "nba-analytics-cluster"

3. **Configure Network Access:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm and wait 1-2 minutes

4. **Create Database User:**
   - Go to "Database Access" → "Add New Database User"
   - Username: `nba-analytics-user`
   - Password: Generate secure password (save this!)
   - Database User Privileges: "Read and write to any database"

5. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Step 2: API Server Setup (3 minutes)

1. **Navigate to API Directory:**
   ```powershell
   cd "C:\Users\adenk\Desktop\level 7\web\website\vote-your-goat\api"
   ```

2. **Install Dependencies:**
   ```powershell
   npm install
   ```

3. **Configure Environment:**
   ```powershell
   # Create .env file
   New-Item -Path ".env" -ItemType File
   
   # Add your MongoDB connection string (replace with your actual values)
   Add-Content -Path ".env" -Value "MONGODB_URI=mongodb+srv://nba-analytics-user:YOUR_PASSWORD@nba-analytics-cluster.xxxxx.mongodb.net/nba-analytics?retryWrites=true&w=majority"
   Add-Content -Path ".env" -Value "PORT=3000"
   ```

4. **Test Database Connection:**
   ```powershell
   node test-connection.js
   ```
   
   **Expected Output:**
   ```
   ✅ Successfully connected to MongoDB Atlas!
   🎉 All tests passed! MongoDB Atlas is working correctly.
   ```

5. **Start API Server:**
   ```powershell
   npm start
   ```
   
   **Expected Output:**
   ```
   ✅ Connected to MongoDB successfully
   Vote API listening on http://localhost:3000
   ```

### Step 3: Launch NBA Analytics Website (1 minute)

1. **Open the Website:**
   - Navigate to your project folder
   - Open `index.html` in your web browser
   - Or use File → Open in your browser

2. **Test the Platform:**
   - Select an NBA player for analysis
   - Click "Submit Analysis"
   - Navigate to "Analytics" to see real-time data
   - Visit "About Us" to learn about the company

## 🎯 Platform Features

### Navigation
- **Home**: Player impact analysis interface
- **Analytics**: Real-time data dashboard with live updates
- **About Us**: Professional company information and team

### Real-time Analytics
- Data updates every 5 seconds automatically
- Professional data visualizations
- MongoDB Atlas cloud database integration
- Offline indicators when API is unavailable

## 🔧 Development Commands

```powershell
# Start API server
cd api
npm start

# Start development server with auto-reload
npm run dev

# Test MongoDB Atlas connection
node test-connection.js

# Initialize database (optional)
npm run migrate
```

## 🌐 Accessing Your Platform

- **Main Website**: Open `index.html` in browser
- **API Endpoints**: `http://localhost:3000/api/votes`
- **Health Check**: `http://localhost:3000`

## 🚨 Common Issues & Solutions

### Issue: "Could not connect to MongoDB Atlas"
**Solution:**
1. Check Network Access whitelist in MongoDB Atlas
2. Verify connection string in `.env` file
3. Ensure cluster is not paused
4. Wait 1-2 minutes after changing network settings

### Issue: "API not responding"
**Solution:**
1. Ensure API server is running (`npm start`)
2. Check console for error messages
3. Verify port 3000 is not in use by another process
4. Restart the server

### Issue: "No data showing in Analytics"
**Solution:**
1. Submit some player analyses first
2. Check browser developer console for errors
3. Verify API server is connected to MongoDB
4. Refresh the analytics page

## 📊 Platform Architecture

```
NBA Analytics Platform
├── Frontend (index.html, results.html, about-us.html)
│   ├── Modern UI with navigation
│   ├── Real-time data visualization
│   └── Professional business design
├── Backend API (Express.js)
│   ├── RESTful endpoints
│   ├── Data validation
│   └── Error handling
└── Database (MongoDB Atlas)
    ├── Cloud-hosted
    ├── Automatic scaling
    └── Built-in security
```

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ API server shows "Connected to MongoDB successfully"
- ✅ Website loads with professional navigation
- ✅ Player analysis submissions work
- ✅ Analytics dashboard shows real-time data
- ✅ Data persists between browser sessions

## 📞 Getting Help

If you encounter issues:
1. Check the console output for specific error messages
2. Verify all prerequisites are installed
3. Ensure MongoDB Atlas network access is configured
4. Try the connection test: `node test-connection.js`

---

**🏀 Welcome to NBA Analytics!**  
*Your professional basketball analytics platform is now ready for data-driven insights.*

---

*Quick Setup Guide - NBA Analytics Platform*  
*Professional Basketball Analytics Solution*  
*Last Updated: September 16, 2025*