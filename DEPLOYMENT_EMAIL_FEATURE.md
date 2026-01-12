# Deploy Email Management Feature to Render

## Steps to Deploy Backend Updates

### 1. Commit Your Changes
```bash
cd e:\Komal-garden\project-hotel
git add .
git commit -m "Add email management feature for admin dashboard"
git push origin main
```

### 2. Deploy to Render
Render automatically deploys when you push to your connected branch. Wait for the deployment to complete (usually 2-5 minutes).

### 3. Initialize Settings on Production
After deployment, run the initialization script on your production database:

**Option A: Using Render Shell**
1. Go to your Render dashboard
2. Select your backend service
3. Click on "Shell" tab
4. Run: `node scripts/initSettings.js`

**Option B: Using Environment Variables**
Make sure your production has these environment variables set:
- `MONGODB_URI` - Your production MongoDB connection string
- `JWT_SECRET` - Your JWT secret key

### 4. Verify Deployment
Test the API endpoint:
```bash
curl https://project-hotel-7dpn.onrender.com/api/settings/contactEmail
```

Expected response:
```json
{
  "key": "contactEmail",
  "value": "reservations@komalgarden.com"
}
```

## Troubleshooting

### 404 Error on /api/settings/contactEmail
**Cause**: Backend not deployed yet or settings route not registered

**Solution**:
1. Check Render logs for deployment errors
2. Verify `backend/routes/settings.js` is included in your repository
3. Verify `backend/server.js` includes: `app.use('/api/settings', settingsRoutes);`

### "Invalid email format" Error
**Cause**: Email validation failing

**Valid Email Examples**:
- ✅ admin@komalgarden.com
- ✅ reservations@komalgarden.com
- ✅ info@komalgarden.com
- ❌ admin@komalgarden (missing TLD)
- ❌ admin komalgarden.com (space in email)
- ❌ @komalgarden.com (missing local part)

### Email Not Updating
**Cause**: Authorization token invalid or expired

**Solution**:
1. Logout from admin dashboard
2. Login again to get fresh token
3. Try updating email again

## Quick Fix for Current Issue

Since your backend isn't deployed yet, you can temporarily update the default email in Footer and Contact components:

**Footer.jsx** (line ~8):
```javascript
const [contactEmail, setContactEmail] = useState('admin@komalgarden.com');
```

**Contact.jsx** (line ~10):
```javascript
const [contactEmail, setContactEmail] = useState('admin@komalgarden.com');
```

But the proper solution is to deploy the backend updates.

## Manual Database Update (If Needed)

If you need to manually set the email in your production database:

1. Connect to your MongoDB Atlas or production database
2. Run this query:
```javascript
db.settings.insertOne({
  key: "contactEmail",
  value: "admin@komalgarden.com",
  description: "Contact email displayed on website",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or update existing:
```javascript
db.settings.updateOne(
  { key: "contactEmail" },
  { 
    $set: { 
      value: "admin@komalgarden.com",
      updatedAt: new Date()
    }
  },
  { upsert: true }
)
```
