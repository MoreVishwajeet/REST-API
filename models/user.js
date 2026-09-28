const mongoose = require("mongoose");

//----> Schema
const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        require : true,
    },
    last_name : {
        type : String,
    },
    email : {
        type : String,
        require : true,
        unique : true,        
    },
    job_title : {
        type : String,
    },
    gender : {
        type : String,
    },
    },{ timestamps: true }
);

//creating a model
const User = mongoose.model('user', userSchema);

module.exports = User;