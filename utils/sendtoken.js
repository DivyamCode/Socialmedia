//cookie and token

const sendToken = (user,statusCode,res)=>{
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });

    const options = {
        Date: new Date(
            Date.now()+process.env.COOKIE_EXPIRE *24*60*60*100
        ),
        httpOnly:true,
    };

    // res.status(statusCode).cookie("token",token,options).json({
    //     success:true,
    //     user,
    //     token
    // })
    res.status(statusCode).cookie("token",token,options).redirect("/home")
};
exports.sendTokenApi = (user,statusCode,res)=>{
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });

    const options = {
        Date: new Date(
            Date.now()+process.env.COOKIE_EXPIRE *24*60*60*100
        ),
        httpOnly:true,
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })   
};

module.exports = sendToken;
