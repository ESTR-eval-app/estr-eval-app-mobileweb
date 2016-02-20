'use strict';

angular.module('app.select', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/select', {
      templateUrl: 'views/select/select.html',
      controller: 'SelectController'
    });
  }])

  .controller('SelectController', ['$scope', '$http', '$location', 'envService', function($scope, $http, $location, envService) {

    $http
      .get('http:' + envService.read('apiUrl') + '/evaluations').then(evaluationsRetrieveSuccess, evaluationsRetrieveFailure);

    function evaluationsRetrieveSuccess(response) {
      $scope.evaluations = [];
      response.data.forEach(function(current, index, array) {
        if (current.status == "Published")
          $scope.evaluations.push(current)
      });
    }

    function evaluationsRetrieveFailure(response) {
      console.log(response);

      if (response.status == 404) {
        console.log('no evaluations found');
      }
      else {
        console.log('failed')
      }
    }

    $scope.startEvaluation = function(id) {
      $location.path("/questions/" + id);
    }

  }]);