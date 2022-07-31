const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
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
    Location:{
        type:String
    },
    Caption:{
        type:String
    },
    CommentOff:{
        type:Boolean,
        default:false
    },
    showLikes:{
        type:Boolean,
        default:true
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
module.exports = mongoose.model("draftPost",draftSchema);