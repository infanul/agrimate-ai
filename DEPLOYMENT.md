# 🚀 AgriMate AI Deployment Guide (Vercel + Render)

This guide walks you through deploying **AgriMate AI Frontend** on **Vercel** and **AgriMate AI Express API Backend** on **Render**.

---

## 1. ⚙️ Deploy Backend to Render

### Step 1: Create Web Service on Render
1. Sign in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following project settings:
   - **Name**: `agrimate-ai-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### Step 2: Configure Render Environment Variables
In the Render Web Service **Environment** section, add the following variables:

| Key | Value / Example | Notes |
|---|---|---|
| `NODE_ENV` | `production` | Production mode |
| `JWT_SECRET` | `your_super_secret_jwt_key_2026` | Generate a strong random key |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/dbname?sslmode=require` | Connection URL to your hosted PostgreSQL database (Render Postgres, Supabase, Neon) |
| `CLIENT_URL` | `https://your-app.vercel.app` | Your Vercel frontend URL (used for CORS) |

### Step 3: Run Database Migrations on Render
If using Prisma with PostgreSQL:
In Render's **Shell** tab (or via build command), run:
```bash
npx prisma db push
```

---

## 2. 🎨 Deploy Frontend to Vercel

### Step 1: Import Project on Vercel
1. Sign in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Set **Root Directory** to `client` (Click Edit next to Root Directory and select `client`).

### Step 2: Configure Vercel Environment Variables
Add the following environment variable under **Environment Variables**:

| Key | Value / Example | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://agrimate-ai-backend.onrender.com/api` | The base URL of your deployed Render backend |

### Step 3: Deploy
Click **Deploy**. Vercel will build the Next.js app and provide your live production URL (e.g., `https://agrimate-ai.vercel.app`).

---

## 3. 🔗 Verify CORS Link
Once Vercel finishes deploying:
1. Copy your Vercel deployment URL (`https://xxx.vercel.app`).
2. Go back to your **Render Web Service** -> **Environment**.
3. Ensure `CLIENT_URL` is set to `https://xxx.vercel.app`.
4. Render will automatically redeploy with the updated CORS setting.

---

## 📝 Environment Files Summary

- **Root**: `/.env.example`
- **Frontend**: `/client/.env.example`
- **Backend**: `/server/.env.example`
- **Render Blueprint**: `/render.yaml` & `/server/render.yaml`
- **Vercel Config**: `/client/vercel.json` & `/vercel.json`
