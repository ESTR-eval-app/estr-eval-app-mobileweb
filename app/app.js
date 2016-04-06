'use strict';

angular.module('app', [
  'ngRoute',
  'config',
  'app.questions',
  'app.select'

]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/select'});
}]);
