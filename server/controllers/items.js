/*
    Handle Incoming Requests for Items
*/
console.log("/server/controllers/items.js");

var mongoose = require("mongoose");
var Item = mongoose.model("Item");
var Category = mongoose.model("Category");

module.exports.index = function (request, response)
{
    Item.find({}, function (err, items) {
        if (err) {
            console.log(err);
        } else {
            response.json({ message: "Items Index", items: items });
        }
    });
}

module.exports.create = function (request, response)
{
    var item = new Item({
        title: request.body.title,
    });
    Category.findById(request.params.categoryId, function (err, category) {
        item.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                category.items.push(item);
                category.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        response.json({
                            message: "Successfully Created Item!",
                            item: item
                        });
                    }
                })
            }
        });
    })
}
