const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://krish_n_a:7KSJcEsxItxE3O0h@inotebook.sfkjoxd.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to Mongo successfully");
    })
}

module.exports = connectToMongo;