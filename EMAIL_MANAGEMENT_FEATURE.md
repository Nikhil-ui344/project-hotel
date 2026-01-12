# Email Management Feature

## Overview
The admin dashboard now includes functionality to dynamically manage the contact email address displayed throughout the website.

## Features Implemented

### 1. **Database Model**
- Created `Settings` model (`backend/models/Settings.js`) to store configurable site settings
- Key-value pair structure for flexible configuration
- Timestamps for tracking changes

### 2. **Backend API**
- New settings routes (`backend/routes/settings.js`):
  - `GET /api/settings` - Get all settings (public)
  - `GET /api/settings/:key` - Get specific setting (public)
  - `PUT /api/settings/:key` - Update setting (admin only)
  - `DELETE /api/settings/:key` - Delete setting (admin only)

### 3. **Admin Dashboard**
- Added "Website Contact Email" section in Settings panel
- Real-time email validation
- Shows current email value
- Immediate feedback on successful updates
- Admin authentication required for updates

### 4. **Frontend Integration**
- **Footer Component**: Dynamically fetches and displays contact email
- **Contact Page**: Dynamically fetches and displays contact email in the email card
- Fallback to default email if API fails

## How to Use

### For Administrators:

1. **Login to Admin Dashboard**
   - Navigate to `/admin/login`
   - Enter your admin credentials

2. **Access Settings**
   - Click on "Settings" in the admin sidebar
   - Scroll to "Website Contact Email" section

3. **Update Contact Email**
   - Enter the new email address
   - Click "Update Email" button
   - The email will be instantly updated across the website

### For Developers:

#### Initialize Default Settings
Run the initialization script to set up the default contact email:
```bash
cd backend
node scripts/initSettings.js
```

#### Add New Settings
To add more configurable settings, use the same pattern:
```javascript
// Create/Update a setting
PUT /api/settings/yourSettingKey
Body: {
  "value": "your value",
  "description": "Description of the setting"
}
```

#### Fetch Settings in Components
```javascript
import { useState, useEffect } from 'react';
import API_URL from '../config/api';

const YourComponent = () => {
  const [settingValue, setSettingValue] = useState('default');

  useEffect(() => {
    fetch(`${API_URL}/api/settings/yourSettingKey`)
      .then(res => res.json())
      .then(data => setSettingValue(data.value))
      .catch(err => console.error(err));
  }, []);

  return <div>{settingValue}</div>;
};
```

## Files Modified/Created

### Created:
- `backend/models/Settings.js` - Settings database model
- `backend/routes/settings.js` - Settings API routes
- `backend/scripts/initSettings.js` - Script to initialize default settings

### Modified:
- `backend/server.js` - Added settings routes
- `src/components/Admin/AdminDashboard.jsx` - Added email management UI
- `src/components/Footer.jsx` - Dynamic email fetching
- `src/components/Contact.jsx` - Dynamic email fetching

## Security
- Email updates require admin authentication
- Email format validation on backend
- Secure token-based authentication

## Future Enhancements
Potential additions to the settings system:
- Phone numbers management
- Business hours configuration
- Social media links management
- Address information management
- Company name and tagline configuration

## Testing
1. Start the backend server: `cd backend && node server.js`
2. Run initialization script: `node scripts/initSettings.js`
3. Login to admin dashboard
4. Navigate to Settings tab
5. Update the contact email
6. Verify changes on Footer and Contact page

## API Examples

### Get Contact Email
```bash
curl http://localhost:5000/api/settings/contactEmail
```

Response:
```json
{
  "key": "contactEmail",
  "value": "reservations@komalgarden.com"
}
```

### Update Contact Email (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/settings/contactEmail \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "value": "newemail@komalgarden.com",
    "description": "Updated contact email"
  }'
```

## Notes
- The default contact email is set to `reservations@komalgarden.com`
- If the API fails to load, components will fallback to the default email
- Changes are reflected immediately without requiring a page refresh
