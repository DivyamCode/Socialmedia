const express = require('express');
const { signup, login } = require('../ApiController/userApiController');
const isAuthenticatedUser = require('../authApi');
const Router = express.Router();

//Routes

Router.route("/signup").post(signup);
Router.route("/login").post(login);


module.exports = Router;