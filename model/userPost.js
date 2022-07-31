const mongoose = require('mongoose');
const userPost = new mongoose.Schema({
    UserName:String,
    postMedia:[{
        post:[{
            PostId:String
        }]
    }],
    saveMedia:[{
        post:[{
            PostId:String
        }]
    }],
    tagMedia:[{
        post:[{
            PostId:String
        }]
    }]
})
module.exports = mongoose.model("userPost",userPost);