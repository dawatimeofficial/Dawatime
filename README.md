# DawaTime – Medicine Reminder App

React frontend + Node.js/Express backend with MongoDB.

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** running locally (e.g. `mongodb://127.0.0.1:27017`) or set `MONGODB_URI` in `backend/.env`

## How to run (local dev)

Run **both** the backend and the frontend.

### 1. Backend

```bash
cd backend
node server.js
```

- API: **http://localhost:5000**
- Optional: create `backend/.env` with:

```bash
PORT=5000
MONGODB_URI=your-local-or-cloud-mongodb-uri
JWT_SECRET=dev-secret-only
CORS_ORIGIN=http://localhost:5173
```

### 2. Frontend

In a **second terminal**:

```bash
cd frontend
npm run dev
```

- App: **http://localhost:5173**

`VITE_API_URL` (in `frontend/.env` or deploy settings) controls which backend the frontend talks to.  
By default it falls back to `http://localhost:5000/api` for local development.

## Production build & deployment

### 1. Configure environment variables

**Backend (`backend/.env` or host config):**

```bash
PORT=5000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<a-strong-random-secret>
CORS_ORIGIN=https://your-frontend-domain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend (`frontend/.env` or host config):**

```bash
VITE_API_URL=https://your-backend-domain.com/api
```

### 2. Build the frontend

```bash
cd frontend
npm run build
```

Deploy the contents of `frontend/dist` to a static host (e.g. Netlify, Vercel, Cloudflare Pages).

### 3. Deploy the backend

On your Node host (Render, Railway, Fly.io, VPS, etc.):

```bash
cd backend
npm install
npm start
```

Set the same `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `CORS_ORIGIN` env vars in the host dashboard.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/medications` | List all medications |
| POST | `/api/medications` | Create medication |
| PATCH | `/api/medications/:id` | Update medication (e.g. mark taken) |
| DELETE | `/api/medications/:id` | Delete medication |
| GET | `/api/family` | List family members |
| POST | `/api/family` | Add family member |
| DELETE | `/api/family/:id` | Delete family member (and their medications) |
