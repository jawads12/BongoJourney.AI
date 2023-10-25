// models/Plan.js

const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  // Define your schema fields here
  phone: String,
  PlanSrc: String,
  startDate:Date,
  numberOfDays: Number,
  withFriends: Boolean,
  withFamily: Boolean,
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
