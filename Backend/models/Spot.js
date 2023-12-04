const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  cityName: String,
  spotName: String,
  latitude: Number,
  longitude: Number,
  details: String,
  openingTime: String,
  closingTime: String,
  address: String,
  pictureUrl: String,
  userReviewCount : Number
});

const Spot = mongoose.model('Spot', spotSchema, 'Spot');

module.exports = Spot;
