const express = require("express")
const path = require("path")
const multer = require("multer")
const extensionExtractor = require('file-ext')
const userProfile = require("../model/userProfileModel");
const fs = require('fs');
const changefol = require("../assets/mkdirUp");
const crypto = require('crypto');
const Post = require("../model/postModel");
const userPost = require("../model/userPost");
const tempPost = require("../model/tempPost");
const changefolPost = require("../assets/mkdirUp");

const maxSize = process.env.FilemaxSize;

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
const storePost = async(req)=>{
	const extension = extensionExtractor(req.fnn);
	const filename = req.fnn;
	const UserName = req.user.UserName;
	const url = req.fnnp;
	const post = Boolean(await tempPost.findOne({UserName}));
	if(!post){
		const upPost = await tempPost.create({UserName,TempPost:{url,extension,filename}});
		return
	}
	const upPost_ = await tempPost.findOneAndUpdate({UserName},{$push:{TempPost:{url,extension,filename}}})	
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "assets/profile");
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
var storageP = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "assets/post");
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
}).single("mypic");
var uploadP = multer({
	storage: storageP,
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
}).single("mypic");

exports.uploadfile = async(req,res,next)=>{
	upload(req,res,function(err) {
		if(err) {
               res.send(err)
        }
        else {
            storeinDb(req);
            // changefol(req.fnnp,req.body.index,res);
			let avatar = req.fnnp
            res.render("uploadDp",{avatar});
        }
    })
}
exports.uploadPost = async(req,res,next)=>{

	uploadP(req,res,function(err) {

		if(err) {
			res.send(err)
		}
		else {
			storePost(req);
			// changefolPost(req.fnnp,req.body.index,res);
			let plink = req.fnnp
			res.render("uploadPost_d",{plink});
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