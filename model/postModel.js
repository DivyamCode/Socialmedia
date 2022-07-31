const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    PostId:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
    },
    Title:{
        type:String
    },
    Caption:{
        type:String
    },
    Location:{
        type:String
    },
    Likes:{
        type:String,
    },
    Tag:{
        type:String
    },
    CommentOff:{
        type:Boolean,
        default:false
    },
    hideLikes:{
        type:Boolean,
        default:false
    },
    media:[{
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
});
module.exports = mongoose.model("Post",PostSchema);