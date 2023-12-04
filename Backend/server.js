require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel');
const City = require('./models/cityModel');
const Spot = require('./models/Spot'); // Adjust the path based on your file structure


const jwt = require('jsonwebtoken');
const secretKey = 'JHJHJHjhfjhjheoanmknjK';
const Plan = require('./models/planModel');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const multer = require('multer');



const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    await mongoose.connect(process.env.USER_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB Atlas");

    // Start the server after successful connection
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
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
    const existingUser = await User.findOne({ phone: phoneNumber });
    if (existingUser) {
      return res.status(400).json({ userCreated: false, message: 'User already exists with this phone number' });
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

// server.js

const ADMIN_CREDENTIALS = {
  name: 'admin',
  password: 'okokok123'
};


app.post('/login', async (req, res) => {
  let { phone, password } = req.body;

  
  try {
    if (phone === "admin" && password === "okokok123") {
      // Admin credentials matched
      const adminToken = jwt.sign({ userId: "admin", isAdmin: true }, secretKey, { expiresIn: '1h' });
      return res.json({ authenticated: true, token: adminToken, isAdmin: true });
    }
    else{
      if (!phone.startsWith("88")) {
        phone = "88" + phone;
      }
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
    }
    
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

app.get('/total-users', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ total: totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total users", error });
  }
});

app.get('/usersinfo', async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    res.json(users); // Send users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/add-city', upload.single('picture'), async (req, res) => {
  try {
    const { name, latitude, longitude, area, population, picture } = req.body;

    console.log(picture)

    // Check if the picture file is available
    if (!picture) {
      return res.status(400).send('No picture file uploaded.');
    }

    const options = {
      overwrite : true,
      invalidate : true,
      resource_type : "auto"
    }


    const cityCount = await City.countDocuments();
    const cityId = String(cityCount + 1).padStart(3, '0');

    // Uploading the picture to Cloudinary
    const result = await cloudinary.uploader.upload(picture, options);

    const pictureUrl = result.secure_url;

      // Create new city object
      const newCity = {
        cityId ,
        name,
        latitude,
        longitude,
        area,
        population,
        picture: pictureUrl // Using the URL from Cloudinary
      };

      // Save newCity to MongoDB
      await City.create(newCity);

      res.status(201).json({ success: true, message: 'City added successfully' });
  } catch (error) {
    console.error('Error adding city:', error);
    res.status(500).json({ success: false, message: 'Failed to add city' });
  }
});

// In your server.js or a dedicated route file
app.get('/get-cities', async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Failed to fetch cities' });
  }
});

app.get('/get-spots', async (req, res) => {
  try {
    const spots = await Spot.find({});
    res.json(spots);
  } catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ message: 'Failed to fetch spots' });
  }
});




app.post('/add-spot',upload.single('picture'),async (req, res) => {
  try {

    const { cityName, spotName, latitude, longitude, details, openingTime, closingTime, address, picture } = req.body;


    // Fetch the City ID based on cityName, assume you have a function getCityIdByName
    const city = await City.findOne({ name: cityName });
    if (!city) {
      return res.status(404).send('City not found');
    }
    const cityId = city.cityId; // Ensure you have a cityId field in your City model

    // Count the number of spots for this city
    const count = await Spot.countDocuments({});

    // Generate Spot ID
    const spotId = cityId + String(count + 1).padStart(6, '0'); // '001000006' for 6th spot in city with ID '001'

    // Upload picture to Cloudinary and get URL...
    console.log(picture);
    // Check if the picture file is available
    if (!picture) {
      return res.status(400).send('No picture file uploaded.');
    }

    const options = {
      overwrite : true,
      invalidate : true,
      resource_type : "auto"
    }
    const result = await cloudinary.uploader.upload(picture, options);

    const pictureUrl = result.secure_url; // Cloudinary URL


    const newSpot = new Spot({spotId, cityName, spotName, latitude, longitude, details, openingTime, closingTime, address, pictureUrl });
    await Spot.create(newSpot);

    res.status(200).json(newSpot);
  } catch (error) {
    console.error('Error adding spot:', error);
    res.status(500).json({ message: 'Failed to add spot' });
  }
});



app.get('/total-cities', async (req, res) => {
  try {
    const totalCities = await City.countDocuments();
    res.json({ total: totalCities });
  } catch (error) {
    console.error('Error fetching total cities:', error);
    res.status(500).json({ message: 'Failed to fetch total cities' });
  }
});

