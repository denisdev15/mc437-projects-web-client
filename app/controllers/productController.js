(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://localhost:3000/';

  app
  .controller('ProductCtrl', ['$http', '$log', '$scope', '$routeParams', '$location', function($http, $log, $scope, $routeParams, $location) {
    $scope.product = {};
    $scope.products = [];
    $scope.dataLoading = false;

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

    $scope.createProduct = function() {
      $scope.dataLoading = true;
      $log.info($scope.product);

      if($scope.product.enabled === undefined) {
        $scope.product.enabled = false;
      }

      // var data = JSON.stringify($scope.product);
      // $log.info(data);
      // var config = {
      //   headers : {
      //     'Content-Type': 'application/json;charset=utf-8;'
      //   }
      // }

      $http.post(url + 'products', $scope.product)
      .success(function(response) {
        if(! response.errors) {
          $scope.dataLoading = false;
          $log.info(response);
          $location.path('/product/' + response.productId);
          $scope.$apply();
        }
      })
      .error(function(response) {
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.getProduct = function() {
      $scope.dataLoading = true;
      $scope.productId = $routeParams.productId;

      $http.get(url + 'products/' + $scope.productId)
      .success(function(response) {
        $scope.product = response;
        $log.info(response);
        $scope.dataLoading = false;
      })
      .error(function(response) {
        $log.error(response);
        $scope.dataLoading = false;
      });

      // $scope.product = {
      //   "_id": "59a0e0ad046c1110c190d353",
      //   "name": "Caneca do neymar",
      //   "__v": 0,
      //   "enabled": true,
      //   "stock": 0,
      //   "dimensions": [
      //     1,
      //     1,
      //     1
      //   ],
      //   "brand": "Minha loja",
      //   "model": "Novo",
      //   "status": [
      //     "enabled"
      //   ],
      //   "Created_date": "2017-08-26T02:45:01.728Z"
      // };
    }

    $scope.editProduct = function(payload) {
      $scope.dataLoading = true;
      $scope.productId = $routeParams.productId;

      $http.put(url + 'products/' + $scope.productId, payload)
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
