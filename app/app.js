'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'environment',
  'app.questions',
  'app.select'

]).
config(['$routeProvider', 'envServiceProvider', function($routeProvider, envServiceProvider) {
  $routeProvider.otherwise({redirectTo: '/select'});

  envServiceProvider.config({
    domains: {
      development: ["localhost"],
      production: ["stevenlyall.me"]
    },
    vars: {
      development: {
        apiUrl: "//localhost:3000/api"
      },
      production: {
        apiUrl: "//stevenlyall.me:3000/api"
      }
    }
  });

  envServiceProvider.check();
}]);
