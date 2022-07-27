const SignUp = require("../../model/userModel");
const bcrypt = require('bcryptjs');
const { use } = require("../routes/userRouteAPI");
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
        sendTokenApi(signup,201,res);
           
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
        res.status(404).json({
            success:false,
            message:"Invalid email and password"
        });
        return null
    }
    sendTokenApi(user,200,res); 
}
