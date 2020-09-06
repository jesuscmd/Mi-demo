var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/map.html'//,
        // controller: 'Mapa',
        // controllerAs: 'vm'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
