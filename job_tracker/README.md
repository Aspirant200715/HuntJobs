# HuntJobs

HuntJobs is a job application tracker built with React + Vite. It helps you track opportunities, manage job applications, monitor progress using analytics, and manage multiple local accounts.

## Live Demo

https://hunt-jobs.vercel.app/

## Features

- Intro landing page with `Get Started` flow
- Login/account entry using name-based local accounts
- Account management (add, switch, delete)
- Dashboard with:
  - Personalized welcome message
  - Total applications, interviews, offers, rejected counts
  - Status pie chart
  - Monthly applications bar chart
- Applications page with:
  - Search (debounced)
  - Filter by status and platform
  - Sort by date, salary, company
  - Save (bookmark), edit, and delete actions
- Add and edit job application forms with validation
- Analytics page with:
  - Status distribution chart
  - Platform-wise chart
  - Monthly trend chart
  - AI-style insights summary based on your data
- Toast notifications for key actions
- Local storage persistence for account name list and saved application data

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS
- React Router DOM
- React Hook Form + Yup
- Recharts
- Framer Motion
- React Toastify
- Axios
- React Icons

## Plugins Used

- Vite:
  - `@vitejs/plugin-react`
- ESLint:
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
- PostCSS/Tailwind:
  - `tailwindcss`
  - `autoprefixer`

## Project Structure

```
job_tracker/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Layout.jsx
│  │  └─ Navbar.jsx
│  ├─ context/
│  │  └─ ApplicationContext.jsx
│  ├─ hooks/
│  │  ├─ useApplications.js
│  │  └─ useDebounce.js
│  ├─ pages/
│  │  ├─ Intro.jsx
│  │  ├─ Login.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Applications.jsx
│  │  ├─ AddApplication.jsx
│  │  ├─ EditApplication.jsx
│  │  └─ Analytics.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ utils/
│  │  ├─ helpers.js
│  │  └─ insights.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ eslint.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

## Application Flow

1. User lands on Intro page (`/`)
2. User clicks `Get Started` and goes to `/login`
3. User can:
   - Add a new account by entering a name
   - Use an existing saved account
   - Delete an existing account
4. Authenticated users access protected routes:
   - `/dashboard`
   - `/applications`
   - `/applications/new`
   - `/applications/:id`
   - `/analytics`

## Local Storage Keys Used

- `huntjobs_user_name` → active account name
- `huntjobs_accounts` → saved account list
- `huntjobs_applications` → persisted applications array (includes saved/bookmarked state)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` → start dev server
- `npm run build` → create production build
- `npm run preview` → preview production build locally
- `npm run lint` → run ESLint
