const express = require('express');
const { signup, login, profile_get_api, editProfile } = require('../ApiController/userApiController');
const isAuthenticatedUser = require('../authApi');
const Router = express.Router();

//Routes

Router.route("/signup").post(signup);
Router.route("/login").post(login);


//Need customize middleware authentification
Router.route("/:username").get(isAuthenticatedUser,profile_get_api);
Router.route("/account/edit").post(isAuthenticatedUser,editProfile);

module.exports = Router;