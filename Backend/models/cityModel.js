// models/City.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityId : String,
  name: String,
  latitude: Number,
  longitude: Number,
  area: Number,
  population: Number,
  picture: String // URL of the image
});

const City = mongoose.model('City', citySchema, 'City');

module.exports = City;
