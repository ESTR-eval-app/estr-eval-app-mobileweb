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

        // check that evaluation has questions
        if ($scope.evaluation.questions.length < 1) {
          alert("There is a problem with this evaluation. Please inform the evaluation facilitator.")
        }

        // TODO if not anonymous, get name

        $scope.response = {
          evaluationId : $scope.evaluation.id,
          questionResponses : [$scope.evaluation.questions.length]
          //name :
        };

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

      // TODO ensure name is sent

      console.log($scope.response);
      $http.post('http:' + envService.read('apiUrl') + '/responses', $scope.response)
        .then(success, fail);

      function success(response) {
        console.log(response);
        console.log('sent successfully');
        $("#evalCompleteModal").modal("hide");
        $("#responseSentMessage").show();
      }

      function fail(response) {
        console.log(response.data);
        console.log('sending failed');
        alert("Sorry, an error occured. Please inform the evaluation facilitator.");
      }

    }

  }]);