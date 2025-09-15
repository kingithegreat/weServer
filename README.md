Vote Your GOAT — simple static site + small API

What this is (plain language):
- A small static website where people can vote for their NBA GOAT.
- A modern Express API that stores votes in MongoDB Atlas cloud database so votes are saved and scalable.

Files you care about:
- `index.html` — the voting page people see.
- `results.html` — shows a live tally of votes (the page fetches data from the API).
- `styles.css` — how the site looks.
- `api/` — a Node/Express app that accepts votes and stores them in MongoDB Atlas cloud database.

Quick start (run locally):
1. Start the API server so votes can be saved:

```powershell
Set-Location 'C:\Users\adenk\Desktop\website\vote-your-goat\api'
npm install
npm start
```

2. Serve the static site (so fetch calls work correctly). From a separate PowerShell window run:

```powershell
Set-Location 'C:\Users\adenk\Desktop\website\vote-your-goat'
py -3 -m http.server 8000
Start-Process 'http://localhost:8000'
```

3. Open the site, vote from multiple browsers or devices, and visit `results.html` to see live counts.

If you want, I can start the API here and run a small smoke test, or connect the voting page to record a few sample votes. Tell me which and I'll do it.
