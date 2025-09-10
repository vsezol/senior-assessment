# Take‑Home Assessment

## DEMO VIDEO

[Watch Demo Video](./demo.mov)

[Link to Google Disk Demo Video](https://drive.google.com/file/d/1OU4Fhh4XWdnsug6zUWeFsMGgPYFlD3r1/view?usp=drive_link)

Welcome, candidate! This project contains **intentional issues** that mimic realâ€‘world scenarios.
Your task is to refactor, optimize, and fix these problems.

## Objectives

### ðŸ’» Frontend (React)

1. **Memory Leak**

   - `Items.js` leaks memory if the component unmounts before fetch completes. Fix it.

2. **Pagination & Search**

   - Implement paginated list with serverâ€‘side search (`q` param). Contribute to both client and server.

3. **Performance**

   - The list can grow large. Integrate **virtualization** (e.g., `react-window`) to keep UI smooth.

4. **UI/UX Polish(optional)**
   - Feel free to enhance styling, accessibility, and add loading/skeleton states.

### ðŸ”§ Backend (Node.js)

1. **Refactor blocking I/O**

   - `src/routes/items.js` uses `fs.readFileSync`. Replace with nonâ€‘blocking async operations.

2. **Performance**
   - `GET /api/stats` recalculates stats on every request. Cache results, watch file changes, or introduce a smarter strategy.

## â° Time Expectation

- Estimated time to complete: **1â€“2 hours**.

## ðŸ“¤ Submission

Once completed, submit one of the following:

- **short video** recording your work.
- **Github Link** where your assessment result were pushed.

---

## Quick Start

node version: 18.XX

```bash
nvm install 18
nvm use 18

# Terminal 1
cd backend
npm install
npm start

# Terminal 2
cd frontend
npm install
npm start
```

> The frontend proxies `/api` requests to `http://localhost:4001`.
