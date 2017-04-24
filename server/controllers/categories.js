/*
    Handle Incoming Requests for Categories
*/
console.log("/server/controllers/categories.js");
var mongoose = require("mongoose");
var Category = mongoose.model("Category");

module.exports.index = function (request, response)
{
  Category.find({}).populate("items").exec(function (err, categories) {
    if (err) {
      console.log(err);
    } else {
      response.json({
        message: "Categories Index",
        categories: categories
      });
    }
  });
}

module.exports.create = function (request, response)
{
  var category = new Category({
    name: request.body.name
  });
  category.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      response.json({
        message: "Successfully Created Category",
        category: category
      });
    }
  });
}
