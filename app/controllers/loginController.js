(function() {
  'use strict';

  var app = angular.module('app');

  app
  .controller('LoginCtrl', ['AuthenticationService', 'FlashService', '$location', '$scope', function(AuthenticationService, FlashService, $location, $scope) {

    var init_ = function() {
      $scope.dataLoading = false;
      AuthenticationService.ClearCredentials();
    };

    $scope.login = function() {
      $scope.dataLoading = true;
      AuthenticationService.Login($scope.username, $scope.password, function (response) {
        if (response.success) {
          AuthenticationService.SetCredentials($scope.username, $scope.password);
          $location.path('/products');
        } else {
          FlashService.Error(response.message);
          $scope.dataLoading = false;
        }
      });
    }

  }]);

})();
