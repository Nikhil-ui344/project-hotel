# Render Backend Deployment Guide

## Deploy to Render:

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `Nikhil-ui344/project-hotel`

## Configuration:

- **Name**: `komal-garden-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: Free

## Environment Variables (Add these in Render):

```
MONGODB_URI=mongodb+srv://komalgardenweb_db_user:WSj6WGGuzOMoYwT2@cluster0.k7bk534.mongodb.net/komal_garden_db?retryWrites=true&w=majority&appName=Cluster0

CLOUDINARY_URL=cloudinary://789358372586235:3cIlFxtC7v2PaTZJja2jdjJSLeQ@dh285yl1q

CLOUDINARY_CLOUD_NAME=dh285yl1q

CLOUDINARY_API_KEY=789358372586235

CLOUDINARY_API_SECRET=3cIlFxtC7v2PaTZJja2jdjJSLeQ

PORT=5000
```

## After Deployment:

Your backend will be at: `https://komal-garden-backend.onrender.com`

Copy this URL - you'll need it for frontend deployment!
