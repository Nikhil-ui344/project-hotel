const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  size: {
    type: String
  },
  view: {
    type: String
  },
  imageUrl: {
    type: String,
    required: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  amenities: [String]
});

module.exports = mongoose.model('Room', roomSchema);
