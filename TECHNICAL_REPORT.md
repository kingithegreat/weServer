# Vote Your GOAT - Technical Architecture Report

## 📋 Overview

**Vote Your GOAT** is a full-stack web application that allows users to vote for their favorite NBA "Greatest of All Time" player. The application consists of a frontend (HTML/CSS/JavaScript) and a backend API (Node.js/Express/MongoDB) that work together to provide real-time voting and results functionality.

---

## 🏗️ Application Architecture

### **System Components**

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐    MongoDB Queries  ┌─────────────────┐
│   Frontend      │ ──────────────────> │   Backend API   │ ──────────────────> │   Database      │
│                 │                     │                 │                     │                 │
│ • index.html    │ <────────────────── │ • Express.js    │ <────────────────── │ • MongoDB       │
│ • results.html  │    HTTP Responses   │ • Controllers   │    Query Results    │ • Mongoose ODM  │
│ • styles.css    │                     │ • Routes        │                     │ • vote-your-goat│
└─────────────────┘                     └─────────────────┘                     └─────────────────┘
```

---

## 🎯 Frontend Architecture

### **File Structure**
```
vote-your-goat/
├── index.html      # Main voting interface
├── results.html    # Results display page
├── styles.css      # Styling and animations
└── assets/         # Player images and logos
```

### **Frontend Flow**

#### **1. Voting Process (index.html)**
```javascript
User Selection → Form Validation → API Request → Response Handling → Redirect
```

**Detailed Steps:**
1. **User Interface**: Cards display NBA players with images and stats
2. **Selection**: Radio buttons allow single player selection or custom "Other" option
3. **Validation**: Client-side check ensures a player is selected
4. **API Call**: POST request to `/api/votes` with JSON payload
5. **Response**: Success redirects to results, failure shows error message

#### **2. Results Display (results.html)**
```javascript
Page Load → Fetch Data → Render Bars → Auto-Refresh (5s) → Update Display
```

**Detailed Steps:**
1. **Initial Load**: Immediately fetch vote data from API
2. **Data Processing**: Calculate percentages and render visual bars
3. **Live Updates**: Automatically refresh every 5 seconds
4. **Error Handling**: Show friendly messages if API is unavailable

### **Frontend Technologies**
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with animations, gradients, and responsive design
- **Vanilla JavaScript**: ES6+ features, async/await, fetch API
- **Progressive Enhancement**: Works without JavaScript (basic functionality)

---

## ⚙️ Backend API Architecture

### **File Structure**
```
api/
├── src/
│   ├── server.js           # Application entry point
│   ├── app.js             # Express app configuration
│   ├── db.js              # MongoDB connection manager
│   ├── migrate.js         # Database initialization script
│   ├── models/
│   │   └── Vote.js        # Mongoose vote model/schema
│   ├── controllers/
│   │   └── votes.js       # Business logic for vote operations
│   └── routes/
│       └── votes.js       # URL routing definitions
├── package.json           # Dependencies and scripts
└── env.template           # Environment configuration template
```

### **API Flow**

#### **1. Vote Creation Flow**
```
POST /api/votes → Route → Controller → Database → Response
```

**Detailed Process:**
1. **Request Reception**: Express receives POST request with JSON body
2. **Route Matching**: `/api/votes` POST route identified
3. **Controller Execution**: `createVote` function processes the request
4. **Data Processing**: Handles "other" player option logic
5. **Database Operation**: Mongoose model saves vote to MongoDB
6. **Response**: Returns success with vote ID

#### **2. Results Retrieval Flow**
```
GET /api/votes → Route → Controller → Database → Aggregation → Response
```

**Detailed Process:**
1. **Request Reception**: Express receives GET request
2. **Route Matching**: `/api/votes` GET route identified
3. **Controller Execution**: `getResults` function processes the request
4. **Database Query**: MongoDB aggregation pipeline groups and counts votes
5. **Data Processing**: Orders results by vote count (descending)
6. **Response**: Returns JSON with player statistics

### **Backend Technologies**
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for API routing and middleware
- **MongoDB**: NoSQL document database
- **Mongoose**: Object Document Mapper (ODM) for MongoDB
- **CORS**: Cross-origin resource sharing for frontend communication

---

## 🗄️ Database Design

### **Schema**
```javascript
// Mongoose Vote Model
{
  _id: ObjectId,           // MongoDB unique identifier
  player: String,          // Player name (required, max 100 chars, trimmed)
  createdAt: Date,         // Automatic timestamp (when vote was created)
  updatedAt: Date          // Automatic timestamp (when vote was modified)
}
```

### **Database Features**
- **MongoDB ObjectId**: Unique identifier for each vote document
- **Player Name**: Stores selected player or custom name with validation
- **Automatic Timestamps**: Mongoose handles createdAt and updatedAt fields
- **Document Storage**: Flexible NoSQL storage with easy scaling
- **Indexes**: Optimized for player aggregation and time-based queries

### **Data Flow**
1. **Vote Storage**: Each vote creates a new document in the `votes` collection
2. **Aggregation**: Results page uses MongoDB aggregation pipeline to group and count votes
3. **Persistence**: Data stored in MongoDB database with automatic replication and durability

---

## 🔄 Communication Protocol

### **API Endpoints**

#### **POST /api/votes**
```json
Request:
{
  "player": "michael-jordan",
  "otherName": ""
}

Response:
{
  "ok": true,
  "id": 123
}
```

#### **GET /api/votes**
```json
Response:
{
  "ok": true,
  "results": [
    {"player": "michael-jordan", "count": 15},
    {"player": "lebron-james", "count": 12},
    {"player": "stephen-curry", "count": 8}
  ]
}
```

### **Error Handling**
- **Network Errors**: Frontend shows user-friendly messages
- **Server Errors**: API returns 500 status with error details
- **Validation Errors**: Client-side validation prevents invalid submissions
- **Offline Mode**: Results page indicates when API is unavailable

---

## 🎨 User Interface Features

### **Design Elements**
- **Dark Theme**: Modern dark color scheme with accent colors
- **Glass Morphism**: Backdrop blur effects for modern appearance
- **Animations**: Smooth transitions, hover effects, and loading states
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### **Interactive Features**
- **Card Selection**: Visual feedback for player selection
- **Loading States**: Button animations during API calls
- **Live Updates**: Real-time results refresh every 5 seconds
- **Progress Bars**: Visual representation of vote percentages

### **Accessibility**
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Indicators**: Clear visual focus states
- **Screen Reader Support**: Semantic HTML with proper labels
- **Reduced Motion**: Respects user's motion preferences

---

## 🚀 Deployment & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm (Node Package Manager)

### **Installation Steps**
1. **Install Dependencies**:
   ```bash
   cd api
   npm install
   ```

2. **Initialize Database**:
   ```bash
   npm run migrate
   ```

3. **Start API Server**:
   ```bash
   npm start
   # Server runs on http://localhost:3001
   ```

4. **Open Frontend**: Open `index.html` in a web browser

### **Development Workflow**
1. **Make Changes**: Edit HTML, CSS, or JavaScript files
2. **Test Locally**: Refresh browser to see changes
3. **API Changes**: Restart server if backend code is modified
4. **Database**: Data persists across server restarts

---

## 🔒 Security Considerations

### **Implemented Security**
- **Input Sanitization**: HTML escaping prevents XSS attacks
- **CORS Configuration**: Controlled cross-origin access
- **Schema Validation**: Prevents malicious data injection
- **Error Handling**: Generic error messages don't expose internals

### **Additional Recommendations**
- **Rate Limiting**: Prevent spam voting from single IP
- **Authentication**: User accounts for vote tracking
- **Input Validation**: Server-side validation of vote data
- **HTTPS**: Secure communication in production

---

## 📊 Performance Characteristics

### **Frontend Performance**
- **Fast Loading**: Minimal dependencies, optimized assets
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Responsive**: Immediate feedback for user interactions
- **Efficient Polling**: 5-second intervals balance freshness with performance

### **Backend Performance**
- **Lightweight**: Express.js with minimal middleware
- **Fast Queries**: MongoDB with proper indexing and aggregation
- **Concurrent Handling**: Node.js event loop for multiple requests
- **Memory Efficient**: File-based database, no memory caching needed

---

## 🔄 Data Flow Summary

### **Complete Vote Cycle**
1. **User Interaction**: Click on player card
2. **Form Submission**: JavaScript captures form data
3. **API Request**: POST to `/api/votes` with vote data
4. **Server Processing**: Express routes to controller function
5. **Database Update**: MongoDB document insertion saves vote
6. **Response**: Server confirms successful vote storage
7. **Redirect**: User taken to results page
8. **Results Display**: GET request fetches aggregated data
9. **Live Updates**: Automatic refresh shows new votes

### **Error Recovery**
- **API Unavailable**: Graceful fallback with offline indicator
- **Network Issues**: Retry mechanisms and user feedback
- **Database Errors**: Logged for debugging, generic user messages
- **Malformed Data**: Validation prevents corruption

---

## 🛠️ Maintenance & Monitoring

### **Log Files**
- **Server Logs**: Console output shows requests and errors
- **Database Logs**: MongoDB operations tracked
- **Client Errors**: Browser console shows frontend issues

### **Backup Strategy**
- **Database Backup**: Copy `votes.db` file regularly
- **Code Backup**: Version control with Git recommended
- **Configuration**: Document any environment-specific settings

### **Monitoring Points**
- **Server Uptime**: Ensure API remains accessible
- **Database Size**: Monitor growth of votes table
- **Response Times**: Track API performance
- **Error Rates**: Watch for increased failure rates

---

## 📈 Future Enhancements

### **Potential Features**
- **User Authentication**: Account-based voting with history
- **Vote Analytics**: Detailed statistics and trends
- **Social Features**: Comments, sharing, player comparisons
- **Mobile App**: Native iOS/Android applications
- **Real-time Updates**: WebSocket connections for instant updates

### **Technical Improvements**
- **Database Optimization**: Indexing for better query performance
- **Caching Layer**: Redis for frequently accessed data
- **Load Balancing**: Multiple server instances for high traffic
- **CDN Integration**: Faster asset delivery globally
- **API Versioning**: Support for backward compatibility

---

## 🎯 Conclusion

The **Vote Your GOAT** application demonstrates a clean separation of concerns between frontend and backend, with a simple but effective data flow. The architecture is scalable, maintainable, and provides a smooth user experience while handling real-time voting and results display efficiently.

The application successfully combines modern web technologies with traditional database storage to create an engaging and functional voting platform that can handle multiple concurrent users while maintaining data integrity and providing immediate visual feedback.

---

*Report generated for Aden Kingi 9821836*
*Application: Vote Your GOAT - NBA Greatest of All Time Voting System*
