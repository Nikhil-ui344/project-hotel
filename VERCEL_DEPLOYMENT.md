# Vercel Frontend Deployment Guide

## Step 1: Update Backend URL

After deploying backend to Render, you'll get a URL like:
`https://komal-garden-backend.onrender.com`

## Step 2: Deploy to Vercel

### Option A - Using Vercel Dashboard:

1. Go to https://vercel.com and sign in
2. Click "Add New" → "Project"
3. Import `Nikhil-ui344/project-hotel`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://komal-garden-backend.onrender.com` (your Render backend URL)

6. Click "Deploy"

### Option B - Using Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts and add environment variable when asked.

## Step 3: Update Backend CORS

After getting your Vercel URL (e.g., `https://komal-garden.vercel.app`), update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'https://komal-garden.vercel.app',  // Your Vercel URL
    'http://localhost:5173'  // Local development
  ]
}));
```

Then redeploy backend on Render.

## Your Live Site:
- Frontend: `https://komal-garden.vercel.app`
- Backend: `https://komal-garden-backend.onrender.com`
