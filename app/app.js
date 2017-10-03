//TODO Apos editar ou adicionar produto -> ir para a tela de list product

var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config( ['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider)
{
  $routeProvider

  // para a rota '/login', carregaremos o template lgoin.html e o controller 'LoginCtrl'
  .when('/login', {
    templateUrl : '/app/views/login/login.html',
    controller  : 'LoginCtrl',
  })

  // para a rota '/register', carregaremos o template register.html e o controller 'RegisterCtrl'
  .when('/register', {
    templateUrl : '/app/views/register/register.html',
    controller  : 'RegisterCtrl',
  })

  // para a rota '/product', carregaremos o template product.html e o controller 'ProductCtrl'
  .when('/products/add', {
    templateUrl : '/app/views/products/add/addProduct.html',
    controller  : 'ProductCtrl',
  })

  .when('/products', {
    templateUrl : '/app/views/products/listAllProducts/listAllProducts.html',
    controller : 'ProductCtrl',
  })

  // para a rota '/product', carregaremos o template product.html e o controller 'ProductCtrl'
  .when('/product/:productId', {
    templateUrl : 'app/views/products/listProduct/listProduct.html',
    controller  : 'ProductCtrl',
  })

  .when('/product/edit/:productId', {
    templateUrl : 'app/views/products/edit/editProduct.html',
    controller  : 'ProductCtrl',
  })

  // caso não seja nenhum desses, redirecione para a rota '/'
  .otherwise ({ redirectTo: '/login' });

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.headers.del = {};

  // remove o # da url
  // $locationProvider.html5Mode(true);

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
