const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Cloudinary configuration
const { uploadRoom, uploadGallery, cloudinary } = require('./config/cloudinary');

// Import auth middleware and routes
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/komal_garden_db')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Models
const Gallery = require('./models/Gallery');
const Room = require('./models/Room');
const Review = require('./models/Review');

// Auth Routes (public - no middleware)
app.use('/api/auth', authRoutes);

// Routes

// Gallery Routes
app.get('/api/gallery', async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/gallery', authMiddleware, uploadGallery.single('image'), async (req, res) => {
  console.log('POST /api/gallery request received');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    // Cloudinary URL is available in req.file.path
    const imageUrl = req.file.path;
    
    console.log('Cloudinary URL:', imageUrl);
    
    const photo = new Gallery({
      imageUrl: imageUrl,
      category: req.body.category,
      description: req.body.description
    });

    const newPhoto = await photo.save();
    console.log('Photo saved successfully:', newPhoto);
    res.status(201).json(newPhoto);
  } catch (err) {
    console.error('Error saving photo:', err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/gallery/:id', authMiddleware, async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (photo && photo.imageUrl) {
      // Extract public_id from Cloudinary URL and delete from Cloudinary
      const urlParts = photo.imageUrl.split('/');
      const publicIdWithExt = urlParts.slice(-2).join('/');
      const publicId = publicIdWithExt.split('.')[0];
      
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryErr) {
        console.log('Cloudinary delete error:', cloudinaryErr);
      }
    }
    
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Room Routes
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/rooms', authMiddleware, uploadRoom.single('image'), async (req, res) => {
  console.log('POST /api/rooms request received');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    // Cloudinary URL is available in req.file.path
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;
    
    if (!imageUrl) {
      console.log('Error: No image URL provided');
      return res.status(400).json({ message: 'Image is required' });
    }

    const room = new Room({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      size: req.body.size,
      view: req.body.view,
      imageUrl: imageUrl,
      isAvailable: req.body.isAvailable === 'true' || req.body.isAvailable === true,
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : []
    });

    const newRoom = await room.save();
    console.log('Room saved successfully:', newRoom);
    res.status(201).json(newRoom);
  } catch (err) {
    console.error('Error saving room:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/rooms/:id', authMiddleware, async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/rooms/:id', authMiddleware, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room && room.imageUrl) {
      // Extract public_id from Cloudinary URL and delete from Cloudinary
      const urlParts = room.imageUrl.split('/');
      const publicIdWithExt = urlParts.slice(-2).join('/');
      const publicId = publicIdWithExt.split('.')[0];
      
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryErr) {
        console.log('Cloudinary delete error:', cloudinaryErr);
      }
    }
    
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Review Routes
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', authMiddleware, async (req, res) => {
  try {
    const review = new Review({
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      comment: req.body.comment,
      isApproved: req.body.isApproved || false
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/reviews/:id', authMiddleware, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/reviews/:id', authMiddleware, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:');
  console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
  console.log('- CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'Not set');
  console.log('- CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
  console.log('- CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');
});
