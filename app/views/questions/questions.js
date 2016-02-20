'use strict';

angular.module('app.questions', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/questions/:evalId', {
      templateUrl: 'views/questions/questions.html',
      controller: 'QuestionsController'
    });
  }])

  .controller('QuestionsController', ['$routeParams', '$scope', '$http', '$location', 'envService', function($routeParams, $scope, $http, $location, envService) {



    // current question number
    $scope.questionIndex = 0;

    (function getEvalQuestions() {
      var evalId = $routeParams.evalId;
      $http
        .get('http:' + envService.read('apiUrl') + '/evaluations/' + evalId)
        .then(success, fail);

      function success(response) {
        $scope.evaluation = response.data[0];
        console.log(response);
        console.log('retrieved successfully');
        console.log($scope.evaluation);

        $scope.response = {
          questionResponses : [$scope.evaluation.questions.length]
        };

        // TODO handle no questions
        // TODO if not anonymous, get name
      }

      function fail(response) {
        console.log(response.data);
        console.log('retrieved fail');
        $location.path('/select');
      }
    })();

    /**
     * Handler for Next button clicks.
     */

    $scope.nextClick = function () {
      console.log("response recorded:");
      console.log($scope.response.questionResponses[$scope.questionIndex]);

      // advance to next question
      $scope.questionIndex++;

      // check if end of survey reached
      if ($scope.questionIndex + 1 > $scope.evaluation.questions.length) {
        console.log("End of survey");

        // if completed
        $("#questionTextPanel").hide();
        $("#evalCompleteModal").modal("show");
      }
    };

    $scope.playQuestionAudio = function() {
      var file = $scope.evaluation.questions[$scope.questionIndex].audioPath;
      //TODO play sound
    }

    $scope.finishEvalBtnClick = function() {
      //todo  send responses

      //todo  show result
      //todo bind error message to modal?

      //todo on success, close modal and show thank you
      $("#evalCompleteModal").modal("hide");
      $("#responseSentMessage").show();



    }

  }]);