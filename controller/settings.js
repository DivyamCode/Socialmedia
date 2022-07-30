

exports.settingPage = async(reqq,res,next)=>{
    res.render("setting")
}

exports.resetPassword = async(req,res,next)=>{
    const {password,} = req.body;
    const user = await SignUp.findOne()

//////////////////////////////////////////////////////////

}