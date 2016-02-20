'use strict';

angular.module('app.questions', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/questions/:evalId', {
      templateUrl: 'views/questions/questions.html',
      controller: 'QuestionsController'
    });
  }])

  .controller('QuestionsController', ['$routeParams', '$scope', '$http', '$location', 'envService', function($routeParams, $scope, $http, $location, envService) {

    $scope.response = {};

    // reference to response buttons
    $scope.buttons = [4];

    // current question number
    $scope.questionIndex = 0;

    // index of selected response
    $scope.selectedResponse = -1;

    $scope.scale = Array.apply( null, { length: 4 } );

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
      console.log("next Button Clicked");

      // todo save response
      //faces?
      //descriptive?

      var questionResponse = {
        question : $scope.questionIndex,
        response : $scope.selectedResponse
      };

      //window.localStorage["q" + $scope.evaluation.questions[$scope.questionIndex].id] = parseInt($scope.selectedResponse);
      //console.log("question " + ($scope.questionIndex + 1) + " response saved " + window.localStorage["q" + $scope.evaluation.questions[$scope.questionIndex].id]);

      // todo advance to next question
      $scope.selectedResponse = -1;
      $scope.questionIndex++;

      // check if end of survey reached
      if ($scope.questionIndex + 1 > $scope.evaluation.questions.length) {
        console.log("End of survey");

        // if completed
        //$state.go('afterSurvey');
        // TODO show finished msg
        return;
      }

      // clear selections
      //for (var i in $scope.buttons) {
      //  $scope.buttons[i].className = "itembutton button";
      //}

      // hide next button

      $("#nextButton").hide();

    };

    /**
     * Handler for response button clicks. Controls button style on selection and picking responses.
     * @param num element id of the button clicked
     */
    $scope.numSelect = function numSelect(num) {


      //console.log(num + " passed to numSelect");

      // array of button elements for the current question
      for (var i = 0; i < $scope.buttons.length; i++) {
        var button = document.getElementById(i);
        //console.log("looping " + i + " " + button);
        $scope.buttons[i] = button;
      }

      //console.log("buttons array: " + scope.buttons);

      // button clicked by user
      var buttonPushed = document.getElementById(num);

      //console.log("button " + buttonPushed.innerHTML + " pushed");

      // show all buttons as deselected
      //for (var i in $scope.buttons) {
      //  $scope.buttons[i].className = "itembutton button";
      //}

      // apply selected style to button clicked by user
      //buttonPushed.className += (" selecteditembutton");

      $("#nextButton").fadeIn();

    };

    $scope.playQuestionAudio = function() {
      var file = $scope.evaluation.questions[questionIndex].audioPath;
      //TODO play sound
    }

  }])

.directive('scaleDirective', function () {
  return {
    link: function (scope, element) {
      element.bind('click', function () {
        scope.numSelect(element.attr('id'));
      });
    }
  }
  });