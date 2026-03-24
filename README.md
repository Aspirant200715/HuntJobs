# HuntJobs

HuntJobs is a React-based job application tracker for managing opportunities, tracking status, and reviewing progress with visual analytics.

Project code is inside `job_tracker/`.

## Live Demo

https://hunt-jobs.vercel.app/

## What This App Does

- Shows an intro page and account login flow before entering the app
- Supports multiple local accounts (name-based)
- Tracks job applications with status, platform, salary, dates, and notes
- Lets users add, edit, delete, and bookmark applications
- Provides dashboard charts and analytics insights from current data
- Persists account/session data and applications in localStorage

## Core Features

### 1) Intro + Account Flow

- Intro page at `/`
- Login page at `/login`
- Account actions:
  - Add account (by name)
  - Switch to saved account
  - Delete saved account

### 2) Dashboard

- Personalized greeting with current account name
- Summary cards:
  - Total Applications
  - Interviews
  - Offers
  - Rejected
- Visuals:
  - Application status pie chart
  - Monthly applications bar chart

### 3) Applications Management

- Search by company or role (debounced input)
- Filter by status and platform
- Sort by applied date, salary, or company name
- Card actions:
  - Save/unsave (bookmark)
  - Edit
  - Delete

### 4) Add / Edit Forms

- `react-hook-form` + `yup` validation
- Fields include company, role, location, salary, platform, status, applied date, interview date, notes
- Toast notifications on successful actions

### 5) Analytics

- Status distribution chart
- Platform-wise applications chart
- Monthly trend chart
- Auto-generated insight bullets from current data

## Routes

- Public:
  - `/` → Intro
  - `/login` → Account page
- Protected (requires active account):
  - `/dashboard`
  - `/applications`
  - `/applications/new`
  - `/applications/:id`
  - `/analytics`

## Data & Persistence

### LocalStorage Keys

- `huntjobs_user_name` → active account name
- `huntjobs_accounts` → saved account names
- `huntjobs_applications` → persisted application records (includes bookmark state)

### Initial Data Source

- If `huntjobs_applications` is empty, app seeds data from:
  - `https://dummyjson.com/products`
- Seeding logic is implemented in `job_tracker/src/services/api.js`

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS
- React Router DOM
- React Hook Form
- Yup
- Recharts
- Framer Motion
- React Toastify
- Axios
- React Icons

## Plugins Used

- Vite plugin:
  - `@vitejs/plugin-react`
- ESLint plugins:
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
- PostCSS/Tailwind plugins:
  - `tailwindcss`
  - `autoprefixer`

## Project Structure

```text
HuntJobs/
├─ README.md
└─ job_tracker/
   ├─ public/
   ├─ src/
   │  ├─ components/
   │  ├─ context/
   │  ├─ hooks/
   │  ├─ pages/
   │  ├─ services/
   │  ├─ utils/
   │  ├─ App.jsx
   │  ├─ main.jsx
   │  └─ index.css
   ├─ package.json
   ├─ vite.config.js
   ├─ tailwind.config.js
   ├─ postcss.config.js
   └─ eslint.config.js
```

## Setup & Run

```bash
cd job_tracker
npm install
npm run dev
```

## Build & Preview

```bash
cd job_tracker
npm run build
npm run preview
```

## NPM Scripts

- `npm run dev` → start development server
- `npm run build` → create production build
- `npm run preview` → preview production build
- `npm run lint` → run ESLint checks
