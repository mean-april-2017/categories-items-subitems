var app = angular.module("itemsApp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "/partials/items-index.html",
    controller: "itemsIndexController"
  }).when("/new", {
    templateUrl: "/partials/new-item.html",
    controller: "newItemController"
  }).when("/new-category", {
    templateUrl: "/partials/new-category.html"
  });
});
app.factory("itemFactory", function ($http) {
  var factory = {};
  factory.getAllItems = function (foundItems) {
    $http.get("/api/items").then(function (response) {
      console.log("RESPONSE:", response);
      foundItems(response.data.items);
    });
  };
  factory.createItem = function (item, createdItem) {
    $http.post("/api/items", item).then(function (response) {
      createdItem(true);
    }).catch(function (error) {
      createdItem(false);
    });
  };
  factory.createSubItem = function (item, subItem, createdSubItem) {
    $http.post("/api/items/" + item._id + "/subitems", subItem).then(function (response) {
      createdSubItem(true);
    }).catch(function (error) {
      createdSubItem(false);
    });
  };
  return factory;
});
app.controller("itemsIndexController", function ($scope, itemFactory) {
  function loadItemsIntoScope () {
    itemFactory.getAllItems(function (items) {
      console.log("ITEMS:", items);
      $scope.items = items;
    });
  }
  loadItemsIntoScope();

  $scope.submitSubItemForm = function (item, subItem) {
    itemFactory.createSubItem(item, subItem, function (success) {
      if (success) {
        alert("SUCCESS");
        loadItemsIntoScope();
      } else {
        alert("ERROR");
      }
    });
  }

});
app.controller("newItemController", function ($scope, $location, itemFactory){
  $scope.submitForm = function () {
    itemFactory.createItem($scope.item, function (success) {
      if (success) {
        alert("SUCCESS");
        $location.url("/");
      } else {
        alert("ERROR");
      }
    });
  };
});
