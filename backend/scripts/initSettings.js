const mongoose = require('mongoose');
require('dotenv').config();

const Settings = require('../models/Settings');

const initSettings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/komal_garden_db');
    console.log('MongoDB Connected');

    // Check if contactEmail already exists
    const existingEmail = await Settings.findOne({ key: 'contactEmail' });
    
    if (existingEmail) {
      console.log('Contact email already exists:', existingEmail.value);
    } else {
      // Create default contact email setting
      const contactEmail = new Settings({
        key: 'contactEmail',
        value: 'info@komalgarden.com',
        description: 'Contact email displayed on website'
      });

      await contactEmail.save();
      console.log('Default contact email created: info@komalgarden.com');
    }

    console.log('Settings initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing settings:', error);
    process.exit(1);
  }
};

initSettings();
