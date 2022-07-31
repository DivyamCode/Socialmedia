const mongoose = require('mongoose');
const tempPost = new mongoose.Schema({
    UserName:String,
    TempPost:[{
        filename:{
            type:String
        },
        url:{
            type:String,
            required:true
        },
        extension:{
            type:String,
            required:true
        }
    }] 
})
module.exports = mongoose.model("tempPost",tempPost);