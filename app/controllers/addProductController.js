(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://localhost:3000/';

  app
  .controller('ProductCtrl', ['$http', '$log', '$scope', function($http, $log, $scope) {
    $scope.product = {};
    $scope.dataLoading = false;

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

    $scope.getProduct = function(productId) {
      $scope.dataLoading = true;

      $http.get(url + 'products/' + productId)
      .success(function(response) {
        $scope.product = response;
        $log.info(response);
        $scope.dataLoading = false;
      })
      .error(function(response) {
        $log.error(response);
        $scope.dataLoading = false;
      });
    }

    $scope.editProduct = function(productId, payload) {
      $scope.dataLoading = true;

      $http.post(url + 'products/' + productId, payload)
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
