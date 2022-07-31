const express = require("express");
const { post_up_form, gett, cgett, postSave } = require("../controller/postController");
const { uploadPost } = require("../controller/uploadHandler");
const isAuthenticatedUser = require("../middleware/auth");
const Router = express.Router();

Router.route("/upload").get(isAuthenticatedUser,post_up_form);
Router.route("/upload").post(isAuthenticatedUser,uploadPost);
// Router.report("/upload/detail").get()
Router.route('/get/:file').get(gett);
Router.route('/check').get(cgett);
Router.route("/upload/save").post(isAuthenticatedUser,postSave);
Router.route("/upload/draft").post(isAuthenticatedUser)



module.exports = Router;