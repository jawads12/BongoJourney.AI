const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userHandler= require("./routeHandler/userHandler");
const User = require("./models/userModel");
require("dotenv").config();
const app = express();

// Start the server
const PORT=process.env.PORT | 5000;
app.listen(PORT,() => console.log(`listening to port ${PORT}`));

///middlewares
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => console.log("Mongodb is conntected.."))
    .catch((err) => console.log(err));
    
// Endpoint for user registration
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ userCreated: fale, message: 'Email already registered' });
      }
  
      // Create a new user document
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      // User registration successful
      res.json({ userCreated: true, message: 'Registration successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ userCreated: false, message: 'An error occurred while registering' });
    }
  });


// Endpoint for user login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ email, password });
  
      if (user) {
        // User login successful
        res.json({ loggedIn: true, message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ loggedIn: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ loggedIn: false, message: 'An error occurred while logging in' });
    }
  });