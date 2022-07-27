const SignUp = require("../model/userModel");
const bcrypt = require('bcryptjs');
const { use } = require("../routes/userRoutes");
const sendToken = require("../utils/sendtoken");
const { gettimeStampH } = require("../utils/time");




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
            res.render("signup_u",{fullname:FullName,mail:email,uname:UserName})
        }
        console.log(UniUser);
        const Password = await bcrypt.hash(password,10);
        const signup = await SignUp.create({
            FullName,email
                ,UserName,Password,usercreateAt,userlastUpdateAt,
                userlastLoginAt
        });
        sendToken(signup,201,res);
           
}
exports.login = async(req,res,next)=>{
   
    const {email,password} = req.body;

    if(!email || !password){
        res.status(404).send("PLease enter Email and Password")
    }
    const user = await SignUp.findOne({email}).select("+password");

    if(!user){
        res.status(404).redirect("/login")
    }
    const isPasswordMatched =await bcrypt.compare(password,user.Password);
    if(!isPasswordMatched){
        res.status(404).redirect("/login");
        return null
    }

    sendToken(user,200,res);  
}

exports.login_get = async(req,res,next)=>{
    res.render("login");
    
}
exports.home = async(req,res,next)=>{
    res.render("home");
}

exports.signup_get = async(req,res,next)=>{
    res.render("signup");
}