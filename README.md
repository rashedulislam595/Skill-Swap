# 🤝 SkillSwap — Freelancing & Skill Exchange Platform

SkillSwap is a premium, secure, and modern freelancing and skill-exchange application built using Next.js 15+ (App Router), Better Auth, Express, and MongoDB. The platform matches clients with skilled freelancers and writers while ensuring strict role-based access control (RBAC) and system administration moderation.

---

## 🚀 Live Deployments

- **Frontend Application:** [https://skill-swap-roan-nine.vercel.app](https://skill-swap-roan-nine.vercel.app)
- **Backend API Server:** [https://skill-swap-server-six.vercel.app](https://skill-swap-server-six.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15+ (React Server Components, App Router)
- **Styling:** Tailwind CSS & Vanilla CSS (Harmonious Dark/Light themes)
- **Icons:** Lucide React
- **Auth Client:** Better Auth React Client
- **State Management / Toasting:** React Toastify

### Backend
- **Framework:** Node.js, Express.js (TypeScript)
- **Database:** MongoDB Atlas (Native driver for optimized lazy query routing)
- **Security Middleware:** Custom token-based Bearer verification & role authentication
- **Compiler:** TS-Node-Dev / TypeScript

---

## 🔑 Key Features

### 👤 Role-Based Portals (RBAC)
- **Client Dashboard:** Post new tasks, manage active listings, review freelancer proposals, and update details.
- **Freelancer Dashboard:** Browse active tasks, submit custom project proposals, edit profiles (skills, bio, hourly rate), and monitor earnings growth.
- **Admin Dashboard:** Access global platform stats (Total Users, Total Tasks, Active Listings, Stripe Revenue), moderate tasks (delete violations), and manage accounts (block/unblock users).

### 🛡️ Hardened Security Architecture
- **Route Guards:** Page-level & Layout-level Server Component guards preventing cross-portal route intrusion.
- **Token Protection:** Express API endpoints are protected using Bearer tokens verified directly against Better Auth's MongoDB session instances.
- **Context Preservation:** Auth validation is seamlessly resolved on server-side and client-side scopes without losing user workflow context.

### 🌐 Performance & Visuals
- **Dynamic SEO:** Custom page metadata for optimal search engine performance.
- **Professional States:** Skeleton loader cards, clean 404 pages, global error boundary pages, and toast feedback for all interactions.

---

## ⚙️ Environment Variables

Create a `.env` file in the **frontend root (`/skill-swap`)**:

```env
# Better Auth Keys
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=https://your-frontend-domain.vercel.app # http://localhost:3000 locally

# Database Connection
MONGO_URI=mongodb+srv://...

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API endpoint
NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app # http://localhost:5000 locally
```

Create a `.env` file in the **backend root (`/skill-swap-server`)**:

```env
PORT=5000
MONGO_DB_URI=mongodb+srv://...
```

---

## 💻 Getting Started Locally

### 1. Set Up Backend Server
```bash
cd skill-swap-server
npm install
npm run dev
```

### 2. Set Up Frontend App
```bash
cd skill-swap
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the client application in your browser.
