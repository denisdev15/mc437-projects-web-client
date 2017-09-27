var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider, $locationProvider)
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

  // para a rota '/product', carregaremos o template product.html e o controller 'ProductCtrl'
  .when('products/list/', {
    templateUrl : 'app/products/list/list.html',
    controller  : 'ListProductCtrl',
  })

  // caso não seja nenhum desses, redirecione para a rota '/'
  .otherwise ({ redirectTo: '/login' });
});
