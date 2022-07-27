const express = require('express');
const cors = require('cors');
const path = require("path")
const app = express();
const cookieparser = require('cookie-parser');

var bodyParser = require('body-parser');
// const errorMiddleware = require("./middleware/eror");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors());


//this for template engine and serving static file

// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/upload'));
// console.log(__dirname + '/public');
// View Engine Setup
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


//Route imports
const userRoute = require("./routes/userRoutes");
const userRouteApi = require("./api/routes/userRouteAPI");


app.use("",userRoute);
app.use("/api/v1",userRouteApi);


module.exports = app;