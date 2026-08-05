# AgriMate AI 🌾🤖

> Production-ready AI-powered smart agriculture and farm management platform built with Next.js, React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Prisma ORM, and JWT Authentication.

---

## 🌟 Features Overview

- 🚀 **Landing Page**: Modern, high-conversion showcase with interactive feature cards, live farm stats, and responsive hero design.
- 🔐 **JWT Authentication**: Full authentication system (Register, Login, Session Check) powered by Express, bcrypt password hashing, and JWT tokens.
- 📊 **Interactive Dashboard Layout**: Responsive design with a top Navbar (user profile, search, notification system) and collapsible Sidebar navigation.
- 🌾 **Smart Farm & Crop Insights**: Database schema and API layer ready for soil metrics, crop diagnostics, weather advisories, and market pricing.
- 🏗️ **Clean Monorepo Architecture**: Decoupled Express API (`server/`) and Next.js App Router UI (`client/`).

---

## 📁 Project Structure

```
agrimate-ai/
├── README.md
├── .env.example
├── server/                    # Node.js + Express API Backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma      # Prisma Schema for PostgreSQL
│   └── src/
│       ├── index.ts           # Express App Server Entry point
│       ├── middleware/
│       │   └── auth.middleware.ts
│       ├── controllers/
│       │   ├── auth.controller.ts
│       │   └── dashboard.controller.ts
│       ├── routes/
│       │   ├── auth.routes.ts
│       │   └── dashboard.routes.ts
│       └── utils/
│           ├── jwt.ts
│           └── password.ts
└── client/                    # Next.js 14 App Router Frontend
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx       # Landing Page
    │   │   ├── login/page.tsx # Login Page
    │   │   ├── register/page.tsx # Register Page
    │   │   ├── globals.css    # Design tokens & CSS styles
    │   │   └── dashboard/
    │   │       ├── layout.tsx # Protected Layout with Navbar + Sidebar
    │   │       └── page.tsx   # Dashboard Overview
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   └── Sidebar.tsx
    │   └── lib/
    │       └── api.ts         # API Client & Auth Storage
```

---

## 🛠️ Quick Start & Setup

### Prerequisites
- Node.js >= 18.x
- npm / yarn / pnpm
- PostgreSQL database (Local, Supabase, Neon, or Docker)

### 1. Environment Configuration
Copy `.env.example` to `.env` in both `server/` and `client/` directories:
```bash
# Server Environment
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agrimate_db?schema=public"
JWT_SECRET="super-secret-jwt-key-change-in-production-2026"
PORT=5000

# Client Environment
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

### 2. Backend Setup (`server/`)
```bash
cd server
npm install
npx prisma generate
npx prisma db push # Pushes database schema to your PostgreSQL database
npm run dev        # Starts Express server on http://localhost:5000
```

### 3. Frontend Setup (`client/`)
```bash
cd client
npm install
npm run dev        # Starts Next.js server on http://localhost:3000
```

---

## ⚡ API Endpoint Structure

| Endpoint | Method | Protected | Description |
|---|---|---|---|
| `/api/auth/register` | `POST` | ❌ | Create new user account |
| `/api/auth/login` | `POST` | ❌ | Authenticate & issue JWT token |
| `/api/auth/me` | `GET` | ✅ | Fetch authenticated user context |
| `/api/dashboard/summary` | `GET` | ✅ | Get overall farm & crop metrics |
| `/api/dashboard/advisories`| `GET` | ✅ | Get recent AI farm recommendations |

---

## 📜 License
MIT License - Open-source agricultural intelligence.
