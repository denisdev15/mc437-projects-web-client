(function() {
  'use strict';

  var app = angular.module('app');
  var url = 'http://localhost:3000/';

  app
  .controller('ProductCtrl', ['$http', '$log', '$scope', '$routeParams', '$location', 'FlashService', '$window', 'UserService', function($http, $log, $scope, $routeParams, $location, FlashService, $window, UserService) {
    $scope.product = {};
    $scope.products = [];
    $scope.dataLoading = false;

    $scope.init = function() {
      $scope.product = {};
      $scope.dataLoading = false;
    }

    $scope.getAllProducts = function() {
      $scope.dataLoading = true;

      return UserService.GetById(localStorage.getItem("userLogged")).then(function(user) {
        var group = user.group;

        $http.get(url + 'products' + '?group=' + group)
        .success(function(response) {
          $scope.products = response;
          $scope.dataLoading = false;
          $log.info(response);
        })
        .error(function(response) {
          $scope.dataLoading = false;
          $log.error(response);
        });
      });
    }

    $scope.createProduct = function() {
      $scope.dataLoading = true;

      return UserService.GetById(localStorage.getItem("userLogged")).then(function(user) {
        var group = user.group;

        if($scope.product.enabled === undefined) {
          $scope.product.enabled = false;
        }

        if($scope.product.img) {
          $scope.product.img = $scope.product.img.replace(/\s/g, "");
          $scope.product.img = $scope.product.img.split(",");
        }

        if($scope.product.dimensions) {
          $scope.product.dimensions = $scope.product.dimensions.replace(/\s/g, "");
          $scope.product.dimensions = $scope.product.dimensions.split(",");
        }

        $scope.product.group = group;

        $log.warn($scope.product);

        $http({
          method: 'POST',
          url: url + 'products',
          data: $scope.product,
          processData: false,
          headers: {'Content-Type': 'application/json'}
        })
        .success(function(response) {
          if(! response.errors) {
            $log.info(response);
            $location.path('/product/' + response._id);
          }
          else {
            FlashService.Error(response.message);
          }
          $scope.dataLoading = false;
        })
        .error(function(response) {
          $scope.dataLoading = false;
          $log.error(response);
        });
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
    }

    $scope.editProduct = function() {
      $scope.dataLoading = true;
      $scope.productId = $routeParams.productId;
      $scope.modifiedValues = {};

      angular.forEach($scope.form, function(value, key) {
        if(key[0] == '$') return;
        console.log(key, value.$pristine);

        if(! value.$pristine) {
          $scope.modifiedValues[key] = $scope.product[key];
        }

        if($scope.modifiedValues.img) {
          $scope.modifiedValues.img = $scope.modifiedValues.img.replace(" ", "");
          $scope.modifiedValues.img = $scope.modifiedValues.img.split(",");
        }

        if($scope.modifiedValues.dimensions) {
          $scope.modifiedValues.dimensions = $scope.modifiedValues.dimensions.replace(" ", "");
          $scope.modifiedValues.dimensions = $scope.modifiedValues.dimensions.split(",");
        }
      });

      console.log($scope.modifiedValues);

      $http({
        method: 'PUT',
        url: url + 'products/' + $scope.productId,
        data: $scope.modifiedValues,
        processData: false,
        headers: {'Content-Type': 'application/json'}
      })
      .success(function(response) {
        $scope.dataLoading = false;
        $log.info(response);
        $location.path('/product/' + $scope.productId);
      })
      .error(function(response) {
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.removeProduct = function(productId) {
      $scope.dataLoading = true;

      $http.delete(url + 'products/' + productId)
      .success(function(response) {
        $window.location.href = '/#/products';
        FlashService.Success(response.message);
        $scope.dataLoading = false;
        $log.info(response);
      })
      .error(function(response) {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.disableProduct = function(productId) {
      $scope.dataLoading = true;

      $http.put(url + 'products/' + productId + '/disable')
      .success(function(response) {
        $window.location.href = '/#/products';
        FlashService.Success('Product disabled.');
        $scope.dataLoading = false;
        $log.info(response);
      })
      .error(function(response) {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.enableProduct = function(productId) {
      $scope.dataLoading = true;

      $http.put(url + 'products/' + productId + '/enable')
      .success(function(response) {
        $window.location.href = '/#/products';
        FlashService.Success('Product enabled.');
        $scope.dataLoading = false;
        $log.info(response);
      })
      .error(function(response) {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
        $log.error(response);
      });
    }

    $scope.updateStock = function() {
      $scope.dataLoading = true;
      var updateValue = $scope.stock - $scope.product.stock;

      if(updateValue > 0) {
        $http.put(url + 'products/' + $scope.product._id + '/increase/stock/' + updateValue)
        .success(function(response) {
          location.reload();
          FlashService.Success('Stock increased.');
          $scope.dataLoading = false;
          $log.info(response);
        })
        .error(function(response) {
          FlashService.Error(response.message);
          $scope.dataLoading = false;
          $log.error(response);
        });
      }

      else {
        $http.put(url + 'products/' + $scope.product._id + '/decrease/stock/' + Math.abs(updateValue))
        .success(function(response) {
          location.reload();
          FlashService.Success('Stock decreased.');
          $scope.dataLoading = false;
          $log.info(response);
        })
        .error(function(response) {
          FlashService.Error(response.message);
          $scope.dataLoading = false;
          $log.error(response);
        });
      }
    }

  } ]);

})();
