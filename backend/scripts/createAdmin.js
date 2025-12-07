const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.log('❌ MongoDB Error:', err);
    process.exit(1);
  });

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@komalgarden.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin account already exists!');
      console.log('Email: admin@komalgarden.com');
      console.log('If you forgot your password, delete the admin from MongoDB and run this script again.');
      process.exit(0);
    }

    // Create the single admin account
    const admin = new Admin({
      username: 'admin',
      email: 'admin@komalgarden.com',
      password: 'Admin@123456' // This will be hashed automatically
    });

    await admin.save();
    
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('✅  Admin Account Created Successfully!');
    console.log('═══════════════════════════════════════════');
    console.log('');
    console.log('📧  Email:    admin@komalgarden.com');
    console.log('🔑  Password: Admin@123456');
    console.log('');
    console.log('⚠️   IMPORTANT: Change this password after first login!');
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
