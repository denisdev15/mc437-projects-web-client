(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://localhost:3000/';

  app
  .controller('ProductCtrl', ['$http', '$log', '$scope', '$routeParams', function($http, $log, $scope, $routeParams) {
    $scope.product = {};
    $scope.products = [];
    $scope.dataLoading = false;

    $scope.getAllProducts = function() {
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


      // $scope.dataLoading = true;
      //
      // $http.get(url + 'products')
      // .success(function(response) {
      //   $scope.products = response;
      //   $scope.dataLoading = false;
      //   $log.info(response);
      // })
      // .error(function(response) {
      //   $scope.dataLoading = false;
      //   $log.error(response);
      // });

    }

    $scope.createProduct = function() {
      $scope.dataLoading = true;
      $scope.product.enabled = true;

      $log.info($scope.product);

      $http.post(url + 'products', $scope.product)
      .success(function(response) {
        $scope.dataLoading = false;
        $log.info(response);
      })
      .error(function(response) {
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.getProduct = function() {
      // $scope.dataLoading = true;
      $scope.productId = $routeParams.productId;

      // $http.get(url + 'products/' + productId)
      // .success(function(response) {
      //   $scope.product = response;
      //   $log.info(response);
      //   $scope.dataLoading = false;
      // })
      // .error(function(response) {
      //   $log.error(response);
      //   $scope.dataLoading = false;
      // });

      $scope.product = {
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
        "brand": "Minha loja",
        "model": "Novo",
        "status": [
          "enabled"
        ],
        "Created_date": "2017-08-26T02:45:01.728Z"
      };
    }

    $scope.editProduct = function(payload) {
      $scope.dataLoading = true;
      $scope.productId = $routeParams.productId;

      $http.post(url + 'products/' + $scope.productId, payload)
      .success(function() {
        $scope.dataLoading = false;
        $log.info(response);
      })
      .error(function(response) {
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.removeProduct = function(productId) {
      $scope.dataLoading = true;

      $http.delete(url + 'products/' + productId)
      .success(function() {
        $route.reload();
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
