(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://localhost:3000/';

  app
  .controller('ListAllProductsCtrl', ['$http', '$log', '$scope', function($http, $log, $scope) {
    $scope.products = [
      {
        "_id": "59a0e0ad046c1110c190d353",
        "name": "Caneca do neymar",
        "__v": 0,
        "enabled": true,
        "stock": 0,
        "dimensions": [
          1,
          1,
          1
        ],
        "brand": "",
        "model": "",
        "status": [
          "enabled"
        ],
        "Created_date": "2017-08-26T02:45:01.728Z"
      },
      {
        "_id": "59a0e57621de56119b81f5bb",
        "name": "Notebook",
        "category": "Informatica",
        "color": "Preta",
        "year": 2017,
        "weight": 1.4,
        "__v": 0,
        "enabled": true,
        "stock": 12,
        "dimensions": [
          1,
          1,
          1
        ],
        "brand": "MSI",
        "model": "GS43VR",
        "status": [
          "enabled"
        ],
        "Created_date": "2017-08-26T03:05:26.256Z"
      }
    ];
    // $scope.getAllProducts();

    $scope.getAllProducts = function() {
      $scope.dataLoading = true;

      $http.get(url + 'products')
      .success(function(response) {
        $scope.products = response;
        $scope.dataLoading = false;
        $log.info(response);
      })
      .error(function(response) {
        $scope.dataLoading = false;
        $log.error(response);
      });

    }



  } ]);

})();
