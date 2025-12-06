const mongoose = require('mongoose');
const Room = require('./models/Room');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/komal_garden_db')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const rooms = [
  { 
    title: 'Deluxe King', 
    price: '$350/night', 
    size: '45m²',
    view: 'City View',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    description: 'Experience ultimate comfort in our Deluxe King room, featuring a plush king-size bed, modern amenities, and stunning city views.',
    isAvailable: true,
    amenities: ['Wifi', 'Coffee', 'Tv', 'Wind']
  },
  { 
    title: 'Executive Suite', 
    price: '$550/night', 
    size: '65m²',
    view: 'Ocean View',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    description: 'Perfect for business or leisure, the Executive Suite offers a separate living area, premium workspace, and exclusive lounge access.',
    isAvailable: true,
    amenities: ['Wifi', 'Coffee', 'Tv', 'Wind']
  },
  { 
    title: 'Presidential Penthouse', 
    price: '$1,200/night', 
    size: '120m²',
    view: 'Panoramic View',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    description: 'The epitome of luxury living. Our Presidential Penthouse features a private terrace, jacuzzi, butler service, and unmatched elegance.',
    isAvailable: true,
    amenities: ['Wifi', 'Coffee', 'Tv', 'Wind']
  },
  { 
    title: 'Garden Villa', 
    price: '$850/night', 
    size: '90m²',
    view: 'Garden View',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    description: 'A private sanctuary surrounded by lush tropical gardens. Features a private pool, outdoor rain shower, and serene atmosphere.',
    isAvailable: true,
    amenities: ['Wifi', 'Coffee', 'Tv', 'Wind']
  },
  { 
    title: 'Family Suite', 
    price: '$650/night', 
    size: '80m²',
    view: 'Pool View',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    description: 'Spacious accommodation for the whole family. Includes two bedrooms, a large living area, and kid-friendly amenities.',
    isAvailable: true,
    amenities: ['Wifi', 'Coffee', 'Tv', 'Wind']
  },
  { 
    title: 'Oceanfront King', 
    price: '$450/night', 
    size: '50m²',
    view: 'Ocean Front',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    description: 'Wake up to the sound of waves. This room offers direct beach access and a private balcony overlooking the ocean.',
    isAvailable: true,
    amenities: ['Wifi', 'Coffee', 'Tv', 'Wind']
  }
];

const seedDB = async () => {
  await Room.deleteMany({});
  await Room.insertMany(rooms);
  console.log('Rooms Seeded!');
  mongoose.connection.close();
};

seedDB();
