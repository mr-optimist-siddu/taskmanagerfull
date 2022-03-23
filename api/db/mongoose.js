// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoURI = "mongodb+srv://dbUser:dbUser@cluster0.flcq5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});




module.exports = {mongoose};