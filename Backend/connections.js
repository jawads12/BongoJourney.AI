// connections.js
const mongoose = require('mongoose');

const userDbConnection = mongoose.createConnection(process.env.USER_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Export the connections
module.exports = { userDbConnection };
