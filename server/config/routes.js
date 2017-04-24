/*
    Route Request to Appropriate Contoller
*/
console.log("/server/config/routes.js");
var categories = require("../controllers/categories");  // Require Categories Controller
var items = require("../controllers/items");  // Require Items Controller
var subItems = require("../controllers/sub-items");  // Require SubItems Controller

module.exports = function (app)
{
    app.get("/api/categories", categories.index);
    app.post("/api/categories", categories.create);
    app.get("/api/items", items.index);
    app.post("/api/categories/:categoryId/items", items.create);
    app.post("/api/items/:itemId/subitems", subItems.create);
}
