# Carbon Pulse — SME Carbon Footprint Estimator (MERN)

Hackathon-ready platform that estimates emissions from common SME activities (electricity, travel, logistics) and generates a **reduction roadmap with ROI** and **tracking**, with a full **MERN** backend for persistence.

## Features

- **Footprint estimation** — Electricity, gas, car/van/flight/train, freight (road/sea/air) with 2024-style emission factors
- **Footprint report** — Total kg CO₂e/year + breakdown by category
- **Reduction roadmap** — Prioritised actions with savings (kg/year), cost (£), and payback
- **Tracking** — Mark actions as done; projected footprint updates in real time
- **Backend** — Save/load reports and tracking state (MongoDB + Express)

## Run locally (full stack)

### 1. MongoDB

Have MongoDB running locally (e.g. [MongoDB Community](https://www.mongodb.com/try/download/community)) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and set `MONGODB_URI` in `backend/.env`.

### 2. Backend (Node + Express + MongoDB)

```bash
cd backend
cp .env.example .env
# Edit .env if needed (PORT, MONGODB_URI, CORS_ORIGIN)
npm install
npm run dev
```

Server runs at [http://localhost:3001](http://localhost:3001). Health: [http://localhost:3001/api/health](http://localhost:3001/api/health).

### 3. Frontend (React + Vite)

```bash
# From project root (carbon-footprint-sme)
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app uses `http://localhost:3001` for the API by default. To override, create `.env` in the project root:

```
VITE_API_URL=http://localhost:3001
```

### 4. Optional: run backend in production mode

```bash
cd backend
npm start
```

## API (backend)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/reports/:id` | Get report by id |
| POST | `/api/reports` | Create report (body: `inputs`, `emissions`, `totalAnnual`) |
| PATCH | `/api/reports/:id` | Update report (body: `completedActions` or full payload) |

Reports are keyed by MongoDB `_id`. The frontend stores the last report id in `localStorage` and loads it on refresh.

## Build (frontend)

```bash
npm run build
npm run preview
```

## Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS v4, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Design:** Syne + JetBrains Mono, lime/cyan theme

## Real-world angle

Practical sustainability planning for SMEs: convert operations into measurable emissions and actionable steps with ROI, then track progress and persist it across sessions.
