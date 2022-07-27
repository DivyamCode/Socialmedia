const mongoose = require('mongoose');

const UserSignupSchema = new mongoose.Schema({
    FullName:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
    },
    PhoneNo:{
        type:Number
    },
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    userlastLoginAt:String,
    userlastUpdateAt:String,
    usercreateAt:String,
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

module.exports = mongoose.model("userSignup",UserSignupSchema);
