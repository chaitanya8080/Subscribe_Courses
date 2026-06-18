# Subscribe Courses (Course Bundler)

A full-stack course-subscription platform: browse courses, subscribe, watch
lectures, manage a personal playlist, and an admin panel for managing courses,
lectures, and users.

- **Backend:** Node.js + Express + MongoDB (Mongoose), JWT auth, Cloudinary
  uploads, Nodemailer, Razorpay.
- **Frontend:** React (CRA) + Redux Toolkit + React Router, styled with **inline
  Tailwind CSS** (purple/orange theme, light + dark mode).

> Design details for every screen are documented in
> [`frontend/FRONTEND_DESIGN.md`](frontend/FRONTEND_DESIGN.md).

---

## Project Structure

```
subscribe_courses/
├── backend/        # Express API (port 4000)
│   ├── controllers/  models/  routes/  middlewares/  utils/  config/
│   ├── app.js  server.js
│   └── .env.example   # copy to .env / config/config.env
└── frontend/       # React app (port 3000)
    ├── src/components/ ... redux/ ...
    └── tailwind.config.js  craco.config.js
```

---

## Prerequisites

- **Node.js** 18+
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a connection string
- A **Cloudinary** account (media uploads) and an SMTP provider (e.g. Mailtrap)

---

## Backend — Setup & Run

```bash
cd backend
npm install

# Create your environment file from the template:
#   - copy .env.example -> config/config.env   (the app loads config/config.env)
#   - fill in real values (Mongo URI, JWT secret, Cloudinary, SMTP, etc.)

npm start          # starts the API on http://localhost:4000
```

The API is served under `http://localhost:4000/api/v1`.

> **Env note:** `app.js` loads variables from `config/config.env`
> (`config({ path: "./config/config.env" })`). Put your real values there.
> Both `.env` and `config/config.env` are git-ignored.

---

## Frontend — Setup & Run

```bash
cd frontend
npm install
npm start          # builds Tailwind CSS, then runs the app on http://localhost:3000
```

### Tailwind CSS
Styling uses a **precompiled Tailwind** pipeline:

- `src/tailwind.input.css` — the Tailwind source (`@tailwind` directives + base).
- `src/index.css` — the **generated** stylesheet that the app imports.

Scripts:
```bash
npm run tw:build   # one-shot compile (also runs automatically via prestart/prebuild)
npm run tw:watch   # recompile on change (run in a second terminal while developing)
```

`npm start` and `npm run build` auto-run `tw:build` first, so the CSS is always
fresh.

---

## Environment Variables (backend)

See [`backend/.env.example`](backend/.env.example). Key values:

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default 4000) |
| `JWT_SECRETKEY` | JWT signing secret |
| `FRONTEND_URL` | Allowed CORS origin (e.g. `http://localhost:3000`) |
| `MONGO_URI` | MongoDB connection string |
| `SMTP_HOST/PORT/USER/PASS` | Email (Nodemailer) |
| `CLOUDINARY_NAME/API_KEY/SECRET_KEY` | Media uploads |
| `MYMAIL` | Sender email address |

> ⚠️ **Never commit real secrets.** The `.env` and `config/config.env` files are
> git-ignored. If a secret was ever exposed, rotate it.

---

## Features

- User auth (register, login, forgot/reset password) with JWT cookies
- Browse & search courses, filter by category
- Subscribe / cancel subscription, watch lectures (subscriber-gated)
- Personal playlist (add / remove)
- Profile management (update profile, change password, change avatar)
- **Admin panel:** dashboard stats & charts, create courses, add/delete lectures,
  manage users & roles
- Light / dark theme toggle

---

## Tech Stack

**Backend:** Express, Mongoose, JWT, bcrypt, Cloudinary, Multer, Nodemailer,
node-cron, Razorpay, Validator.

**Frontend:** React 18 (CRA + CRACO), Redux Toolkit, React Router v6,
react-hot-toast, chart.js, Tailwind CSS.
