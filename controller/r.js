const express = require("express")
const path = require("path")
const multer = require("multer")
const userProfile = require("../model/userProfileModel");
const fs = require('fs');
const changefol = require("../assets/mkdirUp");
const crypto = require('crypto');



const storeinDb = async (req)=>{
    const index = req.body.index;
    const filename = req.fnn;
    const fileurl = req.fnnp;
	// {avatar:fileurl}
	// {$push:{Folder:{folderName:Folder,nextAdd:hash}}});
	// const updp = await userProfile.findOneAndUpdate({UserName:req.user.UserName},{avatar:fileurl});
	const updpTemp = await userProfile.findOneAndUpdate({UserName:req.user.UserName},{avatarTemp:fileurl})
	const updpPrev = await userProfile.findOneAndUpdate({UserName:req.user.UserName},{$push:{avatarPrev:{avatar:fileurl}}});	
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		
		// Uploads is the Upload_folder_name
		cb(null, "assets");
	},
	filename: function (req, file, cb) {
	const filename = file.originalname;
    const random = crypto.randomBytes(14).toString('hex');
	const savedFileName = random + Date.now()+path.extname(file.originalname);
    req.fnn = filename;
    req.fnnp = savedFileName;
    
	cb(null, savedFileName);

	}
})
	
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 10 * 1000 * 1000;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function (req, file, cb){
		var filetypes = /jpeg|jpg|png|pdf|js/;
		var mimetype = filetypes.test(file.mimetype);

		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
                    
		
		if (mimetype && extname) {
			return cb(null, true);
		}

	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
	}

// mypic is the name of file attribute
}).single("mypic");	

exports.uploadfile = async(req,res,next)=>{

        upload(req,res,function(err) {

            if(err) {
                console.log("hh");

                res.send(err)
            }
            else {
                storeinDb(req);
                changefol(req.fnnp,req.body.index,res);
				let avatar = req.fnnp
                res.render("uploadDp",{avatar});
            }
        })
}
exports.uploadfile_get = async(req,res,next)=>{
	const getAvatar = await userProfile.findOne({UserName:req.user.UserName});
	let avatar = getAvatar.avatar;
    res.render("uploadDp",{avatar});
}
exports.temp_p = async(req,res,next)=>{
		const updpTemp = await userProfile.findOne({UserName:req.user.UserName})
		let avatar = updpTemp.avatarTemp;
		const updp = await userProfile.findOneAndUpdate({UserName:req.user.UserName},{avatar});
		res.redirect(`/u/${updpTemp.UserName}`)

}
