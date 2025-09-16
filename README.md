# NBA Analytics — Professional Basketball Analytics Platform

## 🏀 Quick Overview

**NBA Analytics** is a modern full-stack web application that provides data-driven insights into NBA player performance and impact. This platform features a professional business website with real-time analytics powered by MongoDB Atlas.

## 📖 Complete Documentation

**📋 For full project documentation, setup instructions, API reference, and technical specifications, see:**  
**→ [NBA_ANALYTICS_MASTER_REPORT.md](./NBA_ANALYTICS_MASTER_REPORT.md)**

## ⚡ Quick Start

1. **Install Dependencies:**
   ```bash
   cd api
   npm install
   ```

2. **Configure Database:**
   - Create MongoDB Atlas account
   - Update `.env` file with connection string

3. **Start Application:**
   ```bash
   npm start
   ```

4. **Open in Browser:**
   - Open `index.html` in your browser
   - Visit API at `http://localhost:3001`

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
    └── .env            # Environment configuration
```

## 🎯 Key Features

- **Professional Business Website**: Complete navigation and company branding
- **Real-time Analytics Dashboard**: Live data visualization with auto-refresh
- **MongoDB Atlas Integration**: Cloud database with optimized performance
- **Modern UI/UX**: Dark theme with glass morphism effects
- **Responsive Design**: Works on desktop, tablet, and mobile

## � Quick Links

- **📊 [Live Demo](./index.html)** - Open the NBA Analytics platform
- **� [Analytics Dashboard](./results.html)** - View real-time player impact data  
- **🏢 [About Us](./about-us.html)** - Company information and team
- **🔌 [API Health Check](http://localhost:3001)** - Verify backend status

## � Support

For issues, questions, or detailed technical information, refer to the comprehensive documentation in `NBA_ANALYTICS_MASTER_REPORT.md`.

---

**🏀 NBA Analytics - Professional Basketball Data Insights Platform**
