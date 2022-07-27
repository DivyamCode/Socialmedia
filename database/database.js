const mongoose = require('mongoose');

const connectDatabase = ()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/Instagram", { useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> console.log("connection succesfull ..."))
}

module.exports = connectDatabase