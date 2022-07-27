const app = require('./app');
const dotenv = require('dotenv');
//Database import
const connectDatabase = require("./database/database");

//connceting database
connectDatabase();

dotenv.config({path:"config/config.env"});


const server = app.listen(process.env.PORT,()=>{
    console.log(`server running on port http://localhost:${process.env.PORT}`);
});