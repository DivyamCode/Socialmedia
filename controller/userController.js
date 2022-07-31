const SignUp = require("../model/userModel");
const bcrypt = require('bcryptjs');
const sendToken = require("../utils/sendtoken");
const { gettimeStampH } = require("../utils/time");
const Profile = require("../model/userProfileModel");


exports.signup = async(req,res,next)=>{
        const usercreateAt = gettimeStampH();
        const userlastUpdateAt = usercreateAt;
        const userlastLoginAt = userlastUpdateAt;
        const {FullName,email
            ,UserName,password,ConfirmPassword
            } = req.body;
        if(!(password==ConfirmPassword)){
            res.send("Password and confirm Password are not same");
        }
        // var userrr = UserName;
        const UniUser = await SignUp.findOne({UserName});
        if(UniUser){
            res.render("signup_u",{fullname:FullName,mail:email,uname:UserName})
        }
        console.log(UniUser);
        const Password = await bcrypt.hash(password,10);
        const signup = await SignUp.create({
            FullName,email
                ,UserName,Password,usercreateAt,userlastUpdateAt,
                userlastLoginAt
        });
        //another model perform action;
        const NumFollower = 0;
        const NumFollowing = 0;
        const NumPost = 0;
        const profileCreate = await Profile.create({UserName,NumFollower,
                    NumFollowing,NumPost});
        sendToken(signup,201,res);
           
}
exports.login = async(req,res,next)=>{
   
    const {email,password} = req.body;

    if(!email || !password){
        res.status(404).send("PLease enter Email and Password")
    }
    
    const user = await SignUp.findOne({email}).select("+Password");
    const deboolUser = Boolean(user);

    if(!deboolUser){
        res.status(404).redirect("/login")
    }
    
    const isPasswordMatched =await bcrypt.compare(password,user.Password);
    if(!isPasswordMatched){
        res.status(404).redirect("/login");
        return null
    }
    sendToken(user,200,res); 
}
//edit Profile
exports.editProfile = async(req,res,next)=>{
        const {FullName,email
            ,UserName,PhoneNo,Bio,LinkedInLink
            } = req.body;
        
        const UniUser = await SignUp.findOne({UserName});
        if(!(req.user.UserName ==UserName)){
            if(UniUser){
            res.render("editProfile",{user:req.user,User:User,err:"UserName is already taken"});
        }}
        const EditProfile = await SignUp.findOneAndUpdate({UserName:req.user.UserName},{email,FullName,UserName,PhoneNo});
        const EditProfile1 = await Profile.findOneAndUpdate({UserName:req.user.UserName},{UserName,Bio,LinkedInLink});
        res.redirect(`/${UserName}`);
}

//get request

exports.login_get = async(req,res,next)=>{
    res.render("login");   
}
exports.home = async(req,res,next)=>{
    res.render("home",{user:req.user});
}

exports.signup_get = async(req,res,next)=>{
    res.render("signup");
}
exports.profile_get_post= async(req,res,next)=>{
        const UserName = req.user.UserName;
        const User = await Profile.findOne({UserName});
        res.render("profile",{user:req.user,User:User});
}

exports.profile_get_tagged= async(req,res,next)=>{
    const username = req.user.UserName;
    const User = await Profile.findOne({username});
    res.render("profile",{user:req.user,User:User});
}

exports.profile_get_saved= async(req,res,next)=>{
    const username = req.user.UserName;
    const User = await Profile.findOne({username});
    res.render("profile",{user:req.user,User:User});
}

exports.edit_profile = async(req,res,next)=>{
    const username = req.user.UserName;
    const User = await Profile.findOne({username});
    console.log(User);
    res.render("editProfile",{user:req.user,User:User});
}
exports.logoutUser = async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.redirect("/login");

}
exports.redlog = async(req,res,next)=>{
    res.redirect('/login');
}