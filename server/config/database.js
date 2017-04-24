/*
    Database Config File
*/
console.log("/server/config/database.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/full-mean", function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Mongoose");
    }
});
require("../models/item");  // Require Item DB Model
require("../models/category");  // Require Category DB Model
