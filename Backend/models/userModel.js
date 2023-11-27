const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    dateOfBirth: Date,
    verified: Boolean,  
}, { collection: 'info' });

const User = mongoose.model('User', userSchema, 'info', 'user');


module.exports = User;
