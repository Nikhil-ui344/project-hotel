const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Gallery = require('./models/Gallery');
const Room = require('./models/Room');
const Review = require('./models/Review');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/komal_garden_db')
  .then(() => console.log('✅ MongoDB Connected\n'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

async function viewDatabase() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 DATABASE CONTENTS - Komal Garden Hotel');
    console.log('═══════════════════════════════════════════════════════\n');

    // Fetch Rooms
    const rooms = await Room.find();
    console.log(`🏨 ROOMS (${rooms.length} total):`);
    console.log('─────────────────────────────────────────────────────');
    if (rooms.length === 0) {
      console.log('  No rooms found\n');
    } else {
      rooms.forEach((room, index) => {
        console.log(`\n  ${index + 1}. ${room.title}`);
        console.log(`     Price: ${room.price}`);
        console.log(`     Status: ${room.isAvailable ? '✅ Available' : '❌ Booked'}`);
        console.log(`     Size: ${room.size || 'N/A'}`);
        console.log(`     View: ${room.view || 'N/A'}`);
        console.log(`     Description: ${room.description.substring(0, 60)}...`);
        console.log(`     Image: ${room.imageUrl}`);
        console.log(`     Amenities: ${room.amenities.join(', ') || 'None'}`);
      });
      console.log('\n');
    }

    // Fetch Gallery
    const gallery = await Gallery.find();
    console.log(`🖼️  GALLERY (${gallery.length} total photos):`);
    console.log('─────────────────────────────────────────────────────');
    if (gallery.length === 0) {
      console.log('  No photos found\n');
    } else {
      const categories = {};
      gallery.forEach(photo => {
        if (!categories[photo.category]) {
          categories[photo.category] = [];
        }
        categories[photo.category].push(photo);
      });
      
      Object.keys(categories).forEach(category => {
        console.log(`\n  📁 ${category}: ${categories[category].length} photos`);
        categories[category].forEach((photo, index) => {
          console.log(`     ${index + 1}. ${photo.imageUrl}`);
          if (photo.description) {
            console.log(`        "${photo.description}"`);
          }
        });
      });
      console.log('\n');
    }

    // Fetch Reviews
    const reviews = await Review.find();
    console.log(`⭐ REVIEWS (${reviews.length} total):`);
    console.log('─────────────────────────────────────────────────────');
    if (reviews.length === 0) {
      console.log('  No reviews found\n');
    } else {
      const approved = reviews.filter(r => r.isApproved).length;
      const pending = reviews.filter(r => !r.isApproved).length;
      console.log(`  ✅ Approved: ${approved}`);
      console.log(`  ⏳ Pending: ${pending}\n`);
      
      reviews.forEach((review, index) => {
        console.log(`\n  ${index + 1}. ${review.name} (${review.email})`);
        console.log(`     Rating: ${'⭐'.repeat(review.rating)} (${review.rating}/5)`);
        console.log(`     Status: ${review.isApproved ? '✅ Approved' : '⏳ Pending'}`);
        console.log(`     Comment: "${review.comment}"`);
        console.log(`     Date: ${new Date(review.createdAt).toLocaleDateString()}`);
      });
      console.log('\n');
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ Database view complete!');
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error viewing database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

viewDatabase();
