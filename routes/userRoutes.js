const express = require('express');
const { uploadfile_get, uploadfile, temp_p } = require('../controller/uploadHandler');
const { signup, signup_get, login_get, home, login, profile_get_post, profile_get_saved,
     profile_get_tagged, edit_profile, editProfile, logoutUser, redlog } = require('../controller/userController');
const {settingPage,resetPassword} = require("../controller/settings");
const isAuthenticatedUser = require('../middleware/auth');
const Router = express.Router();
//Routes
Router.route('/').get(redlog);
Router.route("/signup").post(signup);
Router.route("/signup").get(signup_get);

Router.route("/login").get(login_get);
Router.route("/login").post(login);
Router.route("/home").get(isAuthenticatedUser, home);


//NEED CUSTOMIZE MIDDLEWARE
Router.route("/u/:username").get(isAuthenticatedUser, profile_get_post);
Router.route("/u/:username/saved").get(isAuthenticatedUser,profile_get_saved);
Router.route("/u/:username/tagged").get(isAuthenticatedUser,profile_get_tagged);

//****************/
Router.route("/upload/dp").get(isAuthenticatedUser,uploadfile_get);
Router.route("/upload/dp").post(isAuthenticatedUser,uploadfile);
Router.route("/upload/dp/fix").get(isAuthenticatedUser,temp_p);

Router.route("/account/edit").get(isAuthenticatedUser,edit_profile);
Router.route("/account/edit").post(isAuthenticatedUser,editProfile);
Router.route("/account/logout").get(isAuthenticatedUser,logoutUser);

//setting user ---Routes
Router.route("/account/setting").get(isAuthenticatedUser,settingPage);
// Router.route("/account/resetpassword").post(isAuthenticatedUser,resetPassword);
          Router.route("/account/setting/privacy").post(isAuthenticatedUser);
          Router.route("/account/setting/security")
          Router.route("/account/setting/ads")
          Router.route("/account/setting/account")
          Router.route("/account/setting/help")


module.exports = Router;