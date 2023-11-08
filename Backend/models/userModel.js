const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type:String,
        require: true,
    },
    password:{
        type:String,
        require: true,
    },
    email: {
        type: String,
        require: false, // Set to true if email is required
      },
      profilePicture: {
        type: String,
        required: false, // Not required, as not all users may have a profile picture
      },
    dateOfBirth:Date,
    verified: Boolean,
    
});
const User= mongoose.model("User",userSchema);
module.exports=User;