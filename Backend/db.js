const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo successfully");
    })
}

module.exports = connectToMongo;