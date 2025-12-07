# Komal Garden Hotel - Production Setup Guide

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (Free M0 tier available)
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace the database name with `komal_garden_db`
8. Update `.env` file with: `MONGODB_URI=your_connection_string`

## Step 2: Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up or log in
3. From your Dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret
4. Update `.env` file with these credentials:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Step 3: Update .env File

Your `backend/.env` should look like:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/komal_garden_db?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_secret_key
PORT=5000
```

## Step 4: Test Locally

1. Start backend: `cd backend && npm start`
2. Start frontend: `npm run dev`
3. Upload a test image to verify Cloudinary integration

## Step 5: Deploy Backend to Render

1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add Environment Variables (all from your .env)
6. Deploy

## Step 6: Deploy Frontend to Vercel

1. Create `frontend/.env` with:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
2. Update all API calls to use `import.meta.env.VITE_API_URL`
3. Go to [Vercel](https://vercel.com)
4. Import your GitHub repository
5. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variable: `VITE_API_URL`
7. Deploy

## Step 7: Update CORS

In `backend/server.js`, update CORS to allow your frontend:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173']
}));
```

## Notes

- All images now stored in Cloudinary (automatic CDN)
- MongoDB Atlas handles database (automatic backups)
- No local file storage needed in production
- Cloudinary optimizes images automatically
