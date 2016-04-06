'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'config',
  'app.questions',
  'app.select'

]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/select'});
}]);
