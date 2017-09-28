app
.controller('RegisterCtrl', ['UserService', 'FlashService', '$location', '$rootScope', '$scope', function(UserService, FlashService, $location, $rootScope, $scope) {
  $scope.register = function() {
    $scope.dataLoading = true;
    UserService.Create($scope.user).then(function (response) {
      if (response.success) {
        FlashService.Success('Registration successful', true);
        $location.path('/login');
      } else {
        FlashService.Error(response.message);
        $scope.dataLoading = false;
      }
    });
  }

}]);
