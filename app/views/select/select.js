'use strict';

angular.module('app.select', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/select', {
      templateUrl: 'views/select/select.html',
      controller: 'SelectController'
    });
  }])

  .controller('SelectController', [
    '$scope',
    '$http',
    '$location',
    'endpointConfig',
    function ($scope, $http, $location, endpointConfig) {

      /**
       * Retrieve all published evaluations
       */
      $http
      .get(endpointConfig.apiEndpoint + '/evaluations')
      .then(evaluationsRetrieveSuccess, evaluationsRetrieveFailure);

    function evaluationsRetrieveSuccess(response) {
      $scope.evaluations = [];
      response.data.forEach(function (evaluation) {
        if (evaluation.status == "Published")
          $scope.evaluations.push(evaluation)
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

      /**
       * Handler for start evaluation button.
       * @param id id of evaluation to begin
       */
    $scope.startEvaluation = function(id) {
      $location.path("/questions/" + id);
    }

  }]);