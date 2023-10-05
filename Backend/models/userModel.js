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
    dateOfBirth:Date,
    verified: Boolean,
    
});
const User= mongoose.model("User",userSchema);
module.exports=User;