const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    NumPost:{
        type:Number,
        required:true
    },
    NumFollower:{
        type:Number,
        required:true
    },
    NumFollowing:{
        type:Number,
        required:true
    },
    ListFollower:[{
        UserName:String,
        date:{
            type:Date
        }
    }],
    ListFollowing:[{
        UserName:String,
        date:{
            type:Date
        }
    }],
    avatar:{
        type:String
    },
    avatarPrev:[{
        avatar:String
    }],
    avatarTemp:{
        type:String
    },
    Bio:{
        type:String,
    },
    HighlightMedia:[{
        post:[{
            url:String,
            MediaType:String
        }]
    }],
    LinkedInLink:String
});

module.exports = mongoose.model("userProfile",UserProfileSchema);
