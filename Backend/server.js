require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
const secretKey = 'JHJHJHjhfjhjheoanmknjK';
const Plan = require('./models/planModel');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const multer = require('multer');
CLOUDINARY_URL='cloudinary://479132786495542:i3rLj08hpR0OK6VCoqLFA5tMkDE@djc8eum1x'



const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/BongoJourney", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // Start the server after successful connection
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();
function generate5DigitRandomNumber() {
  // Generate a random number between 10000 (inclusive) and 99999 (inclusive)
  const min = 10000;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}


const request = require('request');

function sendOTP(phoneNumber, otp, name) {
  const apiKey = '0pH9MfrhnXF32Dcf0t0qnG4KD0OwA08i5qNHvbJ8'; // Replace with your actual API key
  const message = `Hi ${name},  Welcome to BongoJourney.AI. Your OTP is: ${otp}`;
  
  const options = {
    method: 'POST',
    url: 'https://api.sms.net.bd/sendsms',
    formData: {
      api_key: apiKey,
      msg: message,
      to: phoneNumber
    }
  };
  
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response.body);
      }
    });
  });
}




app.post('/register', async (req, res) => {
  try {
    // Create a new user
    const { name, phone, password } = req.body;

    // Ensure the phone number is a valid string
    let phoneNumber = phone;
    if (!phoneNumber.startsWith("880")) {
      phoneNumber = "88" + phoneNumber;
    }

    // Generate an OTP (example OTP: 5353)
    const otp = generate5DigitRandomNumber();
    console.log(otp);

    // Hash the password using bcrypt
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ userCreated: false, otpSent: false, message: 'An error occurred' });
      }

      // Store the user with the hashed password
      const newUser = await User.create({ name, phone: phoneNumber, password: hashedPassword });

      // Send OTP and wait for the response
      await sendOTP(phoneNumber, otp, name);

      // Respond with both registration and OTP status
      res.json({ userCreated: true, otpSent: true, message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error registering user or sending OTP:', error);
    res.status(500).json({ userCreated: false, otpSent: false, message: 'An error occurred' });
  }
});



app.post('/login', async (req, res) => {
  let { phone, password } = req.body;

  if (!phone.startsWith("88")) {
    phone = "88" + phone;
  }
  try {
    // Find the user by email
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ authenticated: false, message: 'Incorrect password' });
    }

    // If the email and password are valid, generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.json({ authenticated: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ authenticated: false, message: 'An error occurred' });
  }
});



app.post('/create-plan', async (req, res) => {
  try {
    const { phone, PlanSrc, startDate} = req.body;

    const newPlan = new Plan({
      phone,
      PlanSrc,
      startDate
    });

    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (error) {
    console.error('Error creating a plan:', error);
    res.status(500).json({ error: 'Failed to create a plan' });
  }
});


cloudinary.config({
  cloud_name: 'djc8eum1x',
  api_key: '479132786495542',
  api_secret: 'i3rLj08hpR0OK6VCoqLFA5tMkDE'
});



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/update-profile', upload.single('profilePicture'), async (req, res) => {
  const { email, password } = req.body;
  const phone = req.body.phone.startsWith('88') ? req.body.phone : `88${req.body.phone}`;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update email and password if provided
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Handle profile picture upload
    if (req.file) {
      // Upload image to Cloudinary
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, 
      async (error, result) => {
        if (error) return res.status(500).json({ success: false, message: 'Failed to upload image' });

        // Update user profile picture with the Cloudinary URL
        user.profilePicture = result.secure_url;

        // Save the updated user
        await user.save();
        res.json({ success: true, message: 'Profile updated successfully', user });
      }).end(req.file.buffer);
    } else {
      // Save the user if there's no profile picture to update
      await user.save();
      res.json({ success: true, message: 'Profile updated successfully', user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error });
  }
});

