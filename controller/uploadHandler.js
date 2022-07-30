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
    
    console.log(req.user);
    const updateDp = await userProfile.findOneAndUpdate({UserName:req.user.UserName},{avatar:fileurl})
    return null
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
                changefol(req.fnnp,req.body.index);
                res.send("Success, Image uploaded!")
            }
        })
}
exports.uploadfile_get = async(req,res,next)=>{
	
    res.render("uploadDp",{user:req.user});
}
