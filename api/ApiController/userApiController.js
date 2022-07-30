const SignUp = require("../../model/userModel");
const bcrypt = require('bcryptjs');
const { sendTokenApi } = require("../../utils/sendtoken");
const { gettimeStampH } = require("../../utils/time");

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
        var userrr = UserName;
        const UniUser = await SignUp.findOne({UserName:userrr});
        if(UniUser){
            res.status(404).json({
                message:"username exist"
            })
        }
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
        sendTokenApi(signup,201,res);
           
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
        res.status(404).json({
            success:false,
            message:"Invalid email and password"
        });
        return null
    }
    sendTokenApi(user,200,res); 
}
exports.profile_get_api= async(req,res,next)=>{
    const username = req.user.UserName;
    const User = await Profile.findOne({username});
    res.json({
        User
    })
}
exports.editProfile = async(req,res,next)=>{
    const {FullName,email
        ,UserName,PhoneNo,Bio,LinkedInLink
        } = req.body;
    
    const UniUser = await SignUp.findOne({UserName});
    if(!(req.user.UserName ==UserName)){
        if(UniUser){
        res.status(404).json({
            message:"Username is already taken"
        });
    }}
    const EditProfile = await SignUp.findOneAndUpdate({UserName:req.user.UserName},{email,FullName,UserName,PhoneNo});
    const EditProfile1 = await Profile.findOneAndUpdate({UserName:req.user.UserName},{UserName,Bio,LinkedInLink});
    res.status(200).json({
        success:true,
        message:"Updated profile successfullty"
    })

}

