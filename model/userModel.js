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
        required:true,
        select:false
    },
    userlastLoginAt:{
        type:String,
        select:false
    },
    userlastUpdateAt:{
        type:String,
        select:false
    },
    usercreateAt:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

module.exports = mongoose.model("userSignup",UserSignupSchema);
