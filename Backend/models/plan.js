const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planId: Number,
  phone: String,

  from: String,
  to: String,
  startDate: Date,
  endDate: Date,
  days: [
    {
      day: Number,
      date: Date,
      nodes: [String], // Array of node names for each day
    },
  ],
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
