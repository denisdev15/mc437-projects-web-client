var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{

  $routeProvider

  // para a rota '/login', carregaremos o template lgoin.html e o controller 'LoginCtrl'
  .when('/login', {
    templateUrl : 'app/login/login.html',
    controller  : 'LoginCtrl',
  })

  // para a rota '/register', carregaremos o template register.html e o controller 'RegisterCtrl'
  .when('/register', {
    templateUrl : 'app/register/register.html',
    controller  : 'RegisterCtrl',
  })

  // para a rota '/product', carregaremos o template product.html e o controller 'ProductCtrl'
  .when('/products/add', {
    templateUrl : 'app/products/add/product.html',
    controller  : 'ProductCtrl',
  })

  .when('/products', {
    templateUrl : 'app/products/listAllProducts/list.html',
    controller  : 'ListAllProductsCtrl',
  })

  // para a rota '/product', carregaremos o template product.html e o controller 'ProductCtrl'
  .when('/products/*', {
    templateUrl : 'app/products/listProduct/list.html',
    controller  : 'ListProductCtrl',
  })

  // caso não seja nenhum desses, redirecione para a rota '/'
  .otherwise ({ redirectTo: '/login' });

  run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
  function run($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }
}]);
