const mongoose = require('mongoose');

// Schema for Announcement
const announcementSchema = new mongoose.Schema({
  announcementId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    required: true
  },
  announcingDate: {
    type: Date,
    default: Date.now
  },
  announcingTime: {
    type: String,
    required: true
  }
});

// Create a model using the schema
const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
