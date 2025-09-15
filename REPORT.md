Vote Your GOAT — Report

Purpose
- Small static site where users vote for their NBA GOAT (Greatest Of All Time).
- A modern Express API stores votes in MongoDB Atlas cloud database so votes persist and can be tallied.

High-level flow
1. User opens `index.html` in a browser.
2. User selects a player and clicks Vote.
3. The browser runs JavaScript that sends a POST to `http://localhost:3001/api/votes` with JSON `{ player, otherName }`.
4. The Express API receives the request, inserts a row into `api/data/votes.db` (table `votes`).
5. When `results.html` opens, it fetches `GET /api/votes` and renders aggregated counts and percentage bars.

Files of interest
- index.html — voting UI and JS to POST votes
- results.html — fetches aggregated results and renders a live tally
- styles.css — site styling and result bar styles
- api/ — Express API
  - src/server.js — starts the server
  - src/app.js — Express app and routes
  - src/routes/votes.js — route mapping
  - src/controllers/votes.js — logic for inserting votes and fetching aggregated results
  - src/db.js — MongoDB connection helper
  - src/models/Vote.js — Mongoose schema for vote documents  
  - src/migrate.js — initializes MongoDB connection and indexes
  - data/ — removed (no local database files needed)

API details (endpoints, inputs, outputs)
- POST /api/votes
  - Purpose: record a vote
  - Request body (JSON): { player: string, otherName?: string }
    - `player` is the radio value from the form (e.g., "michael-jordan").
    - if `player === 'other'` the server will use `otherName` (or the literal "Other" if empty).
  - Response: 201 Created with { ok: true, id }
  - Security: no auth or rate-limiting (anyone can post). Basic input validation is minimal.

- GET /api/votes
  - Purpose: return aggregated vote counts
  - Response: { ok: true, results: [ { player: string, count: number } ] }
  - The MongoDB aggregation pipeline groups by `player` and orders by count desc.

Database
- MongoDB Atlas: Cloud database with vote documents
- Table created by migration:
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
- Each vote is a simple row with the selected player value.

JavaScript behavior (frontend)
- index.html
  - Reads the form when submitted.
  - Builds an object { player, otherName } and sends it via fetch POST to /api/votes.
  - On success it navigates to results.html.
  - If the API is not running the user sees an alert explaining the failure.

- results.html
  - On load it fetches GET /api/votes.
  - Renders rows with player name, a percentage bar, and raw counts.
  - Refreshes the data every 5 seconds to show live updates.

Notes and suggestions
- The API has no authentication — anyone can post votes. Consider adding simple rate-limiting or a secret token if you want to prevent abuse.
- Input validation is minimal. Consider normalising player values and sanitising inputs more strictly on the server.
- For production, the app is ready with MongoDB Atlas cloud database providing scalability and reliability.

How to run (brief)
1. Start the API:

   Set-Location 'C:\Users\adenk\Desktop\website\vote-your-goat\api'
   npm install
   npm run migrate
   npm start

2. Serve static files (separate window):

   Set-Location 'C:\Users\adenk\Desktop\website\vote-your-goat'
   py -3 -m http.server 8000

3. Open http://localhost:8000 and use the site.

If you want, I can also:
- Add simple rate-limiting, input validation, and tests.
- Add an admin view to clear votes or export CSV.
- Deploy the API to a small cloud service and host the static site.

