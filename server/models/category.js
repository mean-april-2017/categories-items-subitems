/*
    Category DB Model
*/
console.log("/server/models/category.js");

var mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
    name: String,
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }]
}, { timestamps: true });

mongoose.model("Category", categorySchema);