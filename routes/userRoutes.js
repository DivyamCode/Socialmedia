const express = require('express');
const { signup, signup_get, checkUserName, login_get, home, login } = require('../controller/userController');
const isAuthenticatedUser = require('../middleware/auth');
const Router = express.Router();

//Routes

Router.route("/signup").post(signup);
Router.route("/signup").get(signup_get);
// Router.route("/checkusername/:uname").get(checkUserName);

Router.route("/login").get(login_get);
Router.route("/login").post(login);
Router.route("/home").get(isAuthenticatedUser, home);

module.exports = Router;