var app = angular.module("itemsApp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "/partials/items-index.html",
    controller: "itemsIndexController"
  }).when("/new", {
    templateUrl: "/partials/new-item.html",
    controller: "newItemController"
  }).when("/new-category", {
    templateUrl: "/partials/new-category.html",
    controller: "newCategoryController"
  }).when("/categories", {
    templateUrl: "/partials/categories-index.html",
    controller: "categoriesIndexController"
  });
});
app.factory("itemFactory", function ($http) {
  var factory = {};
  factory.getAllItems = function (foundItems) {
    $http.get("/api/items").then(function (response) {
      foundItems(response.data.items);
    });
  };
  factory.getAllCategories = function (foundCategories) {
    $http.get("/api/categories").then(function (response) {
      foundCategories(response.data.categories);
    });
  }
  factory.createCategory = function (category, createdCategory) {
    $http.post("/api/categories", category).then(function (response) {
      createdCategory(true);
    }).catch(function (error) {
      createdCategory(false);
    });
  }
  factory.createItem = function (item, createdItem) {
    $http.post("/api/categories/" + item.category._id + "/items", item).then(function (response) {
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
  itemFactory.getAllCategories(function (categories) {
    $scope.categories = categories;
    $scope.item = { category: categories[0] };
  });
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
app.controller("newCategoryController", function ($scope, itemFactory) {
  $scope.submitForm = function () {
    itemFactory.createCategory($scope.category, function (success) {
      if (success) {
        alert("SUCCESS");
      } else {
        alert("ERROR");
      }
    })
  }
});
app.controller("categoriesIndexController", function ($scope, itemFactory) {
  itemFactory.getAllCategories(function (categories) {
    console.log("CATEGORIES:", categories);
    $scope.categories = categories;
  });
});













