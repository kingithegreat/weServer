# NBA Analytics — Professional Basketball Analytics Platform

## 🏀 What This Is

**NBA Analytics** is a modern full-stack web application that provides data-driven insights into NBA player performance and impact. The platform allows users to submit player analysis data and view real-time analytics through interactive visualizations.

## 🎯 Key Features

- **Professional Business Website**: Complete with navigation, about us page, and company branding
- **Player Impact Analysis**: Interactive interface for analyzing NBA player performance
- **Real-time Analytics Dashboard**: Live data visualization powered by MongoDB Atlas
- **Modern UI/UX**: Dark theme with glass morphism effects and smooth animations
- **Cloud Database**: Scalable MongoDB Atlas integration for reliable data storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 📁 Project Structure

```
nba-analytics/
├── index.html           # Main player analysis interface
├── results.html         # Real-time analytics dashboard
├── about-us.html        # Company information and team details
├── styles.css          # Modern styling and animations
├── assets/             # Player images and NBA logos
└── api/                # Node.js/Express backend with MongoDB Atlas
    ├── src/
    │   ├── server.js    # Application entry point
    │   ├── app.js       # Express configuration
    │   ├── db.js        # MongoDB Atlas connection
    │   ├── models/      # Mongoose schemas
    │   ├── controllers/ # Business logic
    │   └── routes/      # API endpoints
    ├── package.json     # Dependencies and scripts
    └── .env            # MongoDB Atlas configuration
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account with configured cluster

### 1. Start the API Server

```powershell
# Navigate to the API directory
cd "C:\Users\adenk\Desktop\level 7\web\website\vote-your-goat\api"

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

You should see:
```
✅ Connected to MongoDB successfully
Vote API listening on http://localhost:3000
```

### 2. Open the Website

Simply open `index.html` in your web browser. The website will automatically connect to the API running on localhost:3000.

### 3. Explore the Platform

- **Home Page** (`index.html`): Submit player analysis data
- **Analytics Dashboard** (`results.html`): View real-time data visualizations
- **About Us** (`about-us.html`): Learn about NBA Analytics company and team

## 🌐 Live Usage

1. **Submit Analysis**: Select an NBA player and submit analysis data
2. **View Results**: Navigate to the Analytics page to see live data
3. **Real-time Updates**: Data refreshes automatically every 5 seconds
4. **Multi-device Support**: Submit data from different devices and see updates in real-time

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose
- **Deployment**: Local development server

## 📊 API Endpoints

- `POST /api/votes` - Submit player analysis data
- `GET /api/votes` - Retrieve aggregated analytics data

## 🔧 Configuration

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Set up a cluster
3. Configure network access (whitelist your IP)
4. Update the connection string in `.env`

### Environment Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
```

## 🎨 Design Features

- **Modern Dark Theme**: Professional appearance with gradient backgrounds
- **Glass Morphism Effects**: Contemporary UI with backdrop filters
- **Smooth Animations**: Enhanced user experience with CSS transitions
- **Responsive Layout**: Optimized for all screen sizes
- **Interactive Elements**: Hover effects and visual feedback

## 👥 Company Information

NBA Analytics is a professional basketball analytics company specializing in data-driven insights for players, teams, and enthusiasts. Our platform combines advanced statistical analysis with intuitive visualizations to uncover the hidden stories behind basketball greatness.

## 📄 License

This project is licensed under the MIT License.

---

*Developed by NBA Analytics Team - Bringing data-driven insights to basketball enthusiasts worldwide.*
