# 📓✨ Full-Stack Notes App

A polished full-stack note-taking web application with secure user authentication and JWT-protected APIs. Build, run, and deploy a simple notes app where users can register, log in, create, read, and delete notes via a Django REST API and a React frontend.

---

## 🚀 Short Description

- **What**: A secure notes app where users can register, log in, and manage notes (create, read, delete).
- **Backend**: Django + Django REST Framework powering APIs, authentication, and data management.
- **Frontend**: React SPA providing a dynamic, responsive UI with protected routes.
- **Authentication**: JSON Web Tokens (JWT) secure endpoints and client sessions.
- **Extras**: Home page, `Note` component, registration/login flows, a friendly 404 page, and deployment guidance for backend, frontend, and the database.

---

## 📚 Table of Contents

- Features
- Tech Stack
- Quick Start
	- Backend
	- Frontend
- API Overview
- Authentication (JWT)
- Protected Routes (frontend)
- Deployment Guide
	- Backend
	- Frontend
	- Database
- Project Structure
- Contributing
- License
- Contact

---

## ✨ Features

- 📝 Create / Read / Delete: Add, list, and remove notes quickly.
- 🔒 Authentication: Register & login using JWT tokens.
- 🚪 Protected routes: Only authenticated users can access note management.
- 🏠 Home page: Landing page with app intro and auth actions.
- 🧩 Note component: Clean UI for creating and viewing notes.
- ❓ 404 page: Friendly "Not Found" route for invalid URLs.
- ☁️ Deployment-ready: Guides for deploying backend, frontend, and database.

---

## 🛠️ Tech Stack

- **Backend**: Django, Django REST Framework
- **Auth**: djangorestframework-simplejwt (JWT)
- **Frontend**: React (create-react-app or Vite)
- **DB**: SQLite (dev) / PostgreSQL (prod)
- **Optional**: Docker for containerized deployment

---

## ⚡ Quick Start

### Prerequisites
- Python 3.10+
- Node.js 16+ and npm
- git
- Optional: PostgreSQL for production

### Backend (local development)
1. Open a terminal and go to the backend folder:
```bash
cd backend
```
2. Create & activate a virtual environment (Windows PowerShell):
```powershell
python -m venv env
.\env\Scripts\Activate.ps1
```
Or (bash/mac):
```bash
python3 -m venv env
source env/bin/activate
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Configure environment variables (example):
- `DJANGO_SECRET_KEY`, `DEBUG=True/False`, `DATABASE_URL` (for prod)
5. Run migrations and start server:
```bash
python manage.py migrate
python manage.py createsuperuser    # optional
python manage.py runserver
```
Backend runs at `http://127.0.0.1:8000/` by default.

### Frontend (local development)
1. Open a new terminal and go to the frontend folder:
```bash
cd Frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the dev server:
```bash
npm start
```
Frontend runs at `http://localhost:3000/` (or configured port) and talks to backend API.

---

## 🔌 API Overview (example endpoints)

- **POST** `/api/auth/register/` — Register an account
- **POST** `/api/auth/login/` — Login; returns `access` (JWT) and optionally `refresh`
- **GET / POST** `/api/notes/` — List notes (GET) / Create note (POST)
- **DELETE / GET** `/api/notes/<id>/` — Delete note (DELETE) / Get single note (GET)

Notes endpoints require Authorization header:
`Authorization: Bearer <access_token>`

Example fetch using JWT:
```js
fetch("/api/notes/", {
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${accessToken}`
	}
})
```

---

## 🔐 Authentication (JWT)

- **Why**: JWT provides stateless token-based auth for the API.
- **How**: User logs in → server returns `access` (short-lived) and `refresh` (optional) tokens. Client stores `access` (memory or secure storage) and sends it in `Authorization` header.
- **Refresh flow**: Use `refresh` token to obtain a new `access` token if implemented.
- **Server libs**: `djangorestframework-simplejwt` recommended.

---

## 🛡️ Protected Routes (React)

- Implement a `PrivateRoute` (or route guard) that checks token state.
- If unauthenticated, redirect to `/login`.
- After login, save token and user data in app state (context, Redux, or local state).
- Keep sensitive tokens out of persistent storage where possible; if stored, consider `httpOnly` cookies for secure setups.

---

## 📦 Deployment Guide (high-level)

### Backend deployment (example: Heroku / Render / DigitalOcean App Platform)
- Use PostgreSQL in production.
- Set `DEBUG=False` and `ALLOWED_HOSTS`.
- Configure `DATABASE_URL` and `DJANGO_SECRET_KEY` in environment.
- Use `gunicorn` as WSGI server:
```bash
pip install gunicorn
gunicorn backend.wsgi:application
```
- Collect static files:
```bash
python manage.py collectstatic --noinput
```
- Configure reverse proxy / CDN for static assets (Nginx or platform-managed).

### Frontend deployment
- Build static files:
```bash
npm run build
```
- Host the build directory on:
	- **Vercel** or **Netlify** — ideal for React SPA.
	- Or serve via Nginx behind the same domain as backend (configure routing for API paths).
- Configure environment variables for API base URL at build-time.

### Database deployment
- Use managed PostgreSQL (Heroku Postgres, Render DB, AWS RDS, Azure Database).
- Set the production `DATABASE_URL` env var to point to the managed DB.
- Run migrations after deploying backend:
```bash
python manage.py migrate
```

### Docker (optional)
- Containerize backend and frontend for reproducible deployments.
- Typical setup: one container for Django (Gunicorn + Nginx), another for React static build (served by Nginx), and a managed Postgres container/service.

---

## 🗂️ Project Structure (high-level)

- `backend/` — Django app, `manage.py`, API and auth
- `backend/backend/` — Django settings, `urls.py`, `wsgi.py`
- `api/` — App for notes, serializers, views, and migrations
- `Frontend/` — React app, components, routes, and build scripts
- `env/` — Virtual environment (local)
- `README.md` — This file

---

## 🔧 Environment Variables (common)

- `DJANGO_SECRET_KEY` — Django secret key
- `DATABASE_URL` — Postgres connection string for production
- `DEBUG` — `True`/`False`
- `ALLOWED_HOSTS` — Comma-separated hosts
- `REACT_APP_API_URL` — Frontend base URL for API (set at build time)

---

## 💡 Tips & Best Practices

- 🧪 Dev vs Prod: Use SQLite for quick dev, PostgreSQL in production.
- 🔁 Token Refresh: Keep `access` short-lived and use `refresh` to renew.
- 🔐 Secure storage: Prefer httpOnly cookies for tokens when feasible.
- 📦 CI/CD: Automate tests, builds, and deploys (GitHub Actions, CircleCI).
- 📁 Static handling: Offload static files to CDN where possible.

---

## 🛠️ Troubleshooting

- CORS errors: ensure backend `CORS_ALLOWED_ORIGINS` includes your frontend origin.
- 401 Unauthorized: verify `Authorization` header format `Bearer <token>`.
- DB connection issues: confirm `DATABASE_URL` and network/firewall rules.

---

## 🤝 Contributing

- Fork, create a feature branch, open a PR.
- Keep commits focused and include tests where useful.
- Report issues or suggest features via the repo issues.

---

## 📜 License

- Add a suitable license (e.g., MIT). Update `LICENSE` file as needed.

---

## ✉️ Contact

- Questions, improvements, or help: open an issue or reach out via the repo.

---

Thank you for using the Full-Stack Notes App! ✨