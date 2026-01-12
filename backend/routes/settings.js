const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const authMiddleware = require('../middleware/auth');

// Get all settings (public route)
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.find();
    
    // Convert to key-value object for easier access
    const settingsObject = {};
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });
    
    res.json(settingsObject);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
});

// Get specific setting by key (public route)
router.get('/:key', async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    
    res.json({ key: setting.key, value: setting.value });
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ message: 'Failed to fetch setting' });
  }
});

// Create or update a setting (admin only)
router.put('/:key', authMiddleware, async (req, res) => {
  try {
    const { value, description } = req.body;
    const { key } = req.params;

    if (!value) {
      return res.status(400).json({ message: 'Value is required' });
    }

    // Validate email format if key is 'contactEmail'
    if (key === 'contactEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    }

    const setting = await Settings.findOneAndUpdate(
      { key },
      { 
        key,
        value,
        ...(description && { description })
      },
      { 
        new: true,
        upsert: true,
        runValidators: true 
      }
    );

    res.json(setting);
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ message: 'Failed to update setting' });
  }
});

// Delete a setting (admin only)
router.delete('/:key', authMiddleware, async (req, res) => {
  try {
    const setting = await Settings.findOneAndDelete({ key: req.params.key });
    
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    
    res.json({ message: 'Setting deleted successfully' });
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({ message: 'Failed to delete setting' });
  }
});

module.exports = router;
