# 🚀 Deployment Guide - Komal Garden Hotel

## Overview
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas (already configured)
- **Images**: Cloudinary (already configured)

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend
Your backend is already ready! It's in the `backend/` folder.

### Step 2: Sign up for Render
1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create a New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Nikhil-ui344/project-hotel`
3. Configure the service:

   **Basic Settings:**
   - **Name**: `komal-garden-backend` (or any name you prefer)
   - **Region**: Choose closest to your location
   - **Branch**: `master`
   - **Root Directory**: `backend`
   
   **Build & Deploy:**
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   
   **Instance Type:**
   - Select **Free** (for testing) or **Starter** (for production)

### Step 4: Add Environment Variables
In the "Environment" section, add these variables:

```
MONGODB_URI=mongodb+srv://komalgardenweb_db_user:WSj6WGGuzOMoYwT2@cluster0.k7bk534.mongodb.net/komal_garden_db

CLOUDINARY_URL=cloudinary://789358372586235:3cIlFxtC7v2PaTZJja2jdjJSLeQ@dh285yl1q

CLOUDINARY_CLOUD_NAME=dh285yl1q

CLOUDINARY_API_KEY=789358372586235

CLOUDINARY_API_SECRET=3cIlFxtC7v2PaTZJja2jdjJSLeQ

JWT_SECRET=komal_garden_hotel_jwt_secret_key_2024_CHANGE_THIS_IN_PRODUCTION

PORT=5000
```

**⚠️ IMPORTANT**: Change `JWT_SECRET` to a strong random string for production!

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for the build to complete (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://komal-garden-backend.onrender.com`
4. **Copy this URL** - you'll need it for the frontend!

### Step 6: Update CORS (Important!)
After getting your Vercel URL, you'll need to update the backend CORS settings.

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Sign up for Vercel
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your repository: `Nikhil-ui344/project-hotel`
3. Configure the project:

   **Framework Preset**: `Vite`
   
   **Root Directory**: `./` (leave as root)
   
   **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 3: Add Environment Variable
In the "Environment Variables" section, add:

**Key**: `VITE_API_URL`
**Value**: `https://komal-garden-backend.onrender.com` (your Render backend URL)

Make sure to use the **exact URL** from Render (without trailing slash)!

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. You'll get a URL like: `https://komal-garden.vercel.app`

---

## 🔧 Part 3: Update Backend CORS

Now that you have your Vercel URL, you need to update the backend to allow requests from it.

### Update server.js CORS configuration:

1. Open `backend/server.js`
2. Find the CORS configuration (around line 15-20)
3. Update it to include your Vercel URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://komal-garden.vercel.app',  // Add your Vercel URL here
    'https://your-vercel-domain.vercel.app'  // Add any custom domains
  ],
  credentials: true
}));
```

4. Commit and push the changes:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

5. Render will automatically redeploy with the new CORS settings!

---

## ✅ Part 4: Test Your Deployment

### Test Backend
Visit: `https://your-backend-url.onrender.com/api/rooms`
- Should return JSON data of rooms

### Test Frontend
Visit: `https://your-frontend-url.vercel.app`
- Site should load
- Images should display
- Gallery should work
- Admin login should work at `/admin/login`

### Test Admin Panel
1. Go to: `https://your-frontend-url.vercel.app/admin/login`
2. Login with your credentials (email you set + password)
3. Try creating/editing rooms, gallery, etc.

---

## 🔐 Important Security Notes

### After Deployment:

1. **Change JWT Secret**: Update `JWT_SECRET` in Render to a strong random string:
   ```
   JWT_SECRET=your_very_long_random_secret_string_here_min_32_chars
   ```

2. **Change Admin Password**: Login to admin panel and change your password immediately

3. **Consider Changing Email**: Use a secure business email for admin access

---

## 🐛 Troubleshooting

### Backend Issues

**Build fails:**
- Check that `backend/package.json` exists
- Verify all dependencies are in `package.json`

**Server crashes:**
- Check Render logs for errors
- Verify all environment variables are set correctly

**Cannot connect to MongoDB:**
- Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
- Verify connection string is correct

### Frontend Issues

**Build fails:**
- Check `package.json` has all dependencies
- Run `npm run build` locally to test

**API calls fail:**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Make sure backend CORS includes your Vercel URL

**Images not loading:**
- Images should load from Cloudinary
- Check Cloudinary credentials in Render

---

## 📱 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend):
1. Go to Service Settings → Custom Domains
2. Add your custom domain (requires paid plan)
3. Update DNS records as instructed

---

## 🔄 Automatic Deployments

Both platforms are now set up for automatic deployments:
- **Push to GitHub** → Both sites automatically redeploy
- **Vercel**: Deploys on every push to master
- **Render**: Deploys on every push to master

---

## 💰 Pricing

**Render (Backend):**
- Free tier: Good for testing, sleeps after 15 min inactivity
- Starter: $7/month, no sleep, better performance

**Vercel (Frontend):**
- Hobby (Free): Perfect for personal projects
- Pro: $20/month for commercial use

**MongoDB Atlas & Cloudinary:**
- Currently using free tiers ✅

---

## 📞 Support

If you encounter issues:
1. Check the deployment logs in Render/Vercel
2. Verify all environment variables
3. Test backend endpoints directly
4. Check browser console for frontend errors

---

**🎉 That's it! Your hotel website is now live on the internet!**
