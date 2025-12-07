const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/komal_garden_db')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Models
const Gallery = require('./models/Gallery');
const Room = require('./models/Room');
const Review = require('./models/Review');

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

app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    
    const photo = new Gallery({
      imageUrl: imageUrl,
      category: req.body.category,
      description: req.body.description
    });

    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
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

app.post('/api/rooms', upload.single('image'), async (req, res) => {
  console.log('POST /api/rooms request received');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    
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

app.put('/api/rooms/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/rooms/:id', async (req, res) => {
  try {
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

app.post('/api/reviews', async (req, res) => {
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

app.put('/api/reviews/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
