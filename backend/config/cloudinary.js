const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage for Room Images
const roomStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'komal-garden/rooms',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
  }
});

// Storage for Gallery Images
const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'komal-garden/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1600, height: 1200, crop: 'limit', quality: 'auto' }]
  }
});

// Create multer upload instances
const uploadRoom = multer({ 
  storage: roomStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit (Cloudinary free plan)
});

const uploadGallery = multer({ 
  storage: galleryStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit (Cloudinary free plan)
});

module.exports = {
  cloudinary,
  uploadRoom,
  uploadGallery
};
