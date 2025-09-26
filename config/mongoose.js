const mongoose = require("mongoose");
const env = require("./environment.js");

const mongoURI = `${process.env.MONGODB_URI}/${env.db}`;

// const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongoDB"));

db.once("open", function(){
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;