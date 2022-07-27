const jwt = require('jsonwebtoken');
const User = require("../model/userModel");


const isAuthenticatedUser = async (req,res,next)=>{
    try {
        const token1 = req.cookies;
        if(!token1.token){
            res.status(401).json({
                success:false,
                message:"please login to access this resources"
            });
            return null
        }
        const c_token = token1.token;
        
        const decodedData = jwt.verify(c_token,process.env.JWT_SECRET);
        
        req.user = await User.findById(decodedData.id);
       

        next();
    } catch (error) {
        
    }
};

module.exports = isAuthenticatedUser
