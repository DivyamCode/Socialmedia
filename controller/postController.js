const path = require('path');
const postModel = require("../model/postModel");
const userPost = require("../model/userPost");
const draftPost = require("../model/draftModel");
const tempPost = require('../model/tempPost');
const userProfile = require("../model/userProfileModel");
const crypto = require('crypto');




exports.post_up_form = async(req,res,next)=>{
    res.render('uploadPost')
}

exports.postSave = async(req,res,next)=>{
       const UserName = req.user.UserName;
       const PostId = crypto.randomBytes(14).toString('hex');
       const postPrevInfo = await tempPost.findOne({UserName});
       const media = postPrevInfo.TempPost;
       const {Caption,CommentOff,Location,hideLikes,Tag,Title} = req.body;
       console.log(Caption,CommentOff,Location,hideLikes,Tag,Title);
       const post_ = await postModel.create({PostId,UserName,Caption,CommentOff,Location,hideLikes,Tag,
                                            Title,media});
       const addPostCheck = Boolean(await userPost.findOne({UserName}));
       if(addPostCheck){
        const addPost = await userPost.findOneAndUpdate({UserName},{$push:{postMedia:{post:{PostId}}}})
       }
       const userPostCreate = await userPost.create({UserName,postMedia:{post:{PostId}}});
       
       const postPrevInfoDEl = await tempPost.deleteOne({UserName});

       const PostNum = await userProfile.findOne({UserName});
       let NumPost = PostNum.NumPost;
       NumPost = NumPost + 1;
       let IncrePost = await userProfile.findOneAndUpdate({UserName},{NumPost});

       res.redirect(`/u/${UserName}`);

}



//check and work ----some-ltr

exports.gett = async(req,res,next)=>{
    fileName = req.params.file;
    filepath = path.join(__dirname+`/../assets/post/${fileName}`);
    console.log(filepath);
    res.sendFile(filepath);
}
exports.cgett = async(req,res,next)=>{
    res.render('cmA')
}
