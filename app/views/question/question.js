'use strict';

angular.module('app.question', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/question', {
      templateUrl: 'views/question/question.html',
      controller: 'QuestionController'
    });
  }])

  .controller('QuestionController', ['$scope', '$http', function(scope, http) {

    // reference to response buttons
    scope.buttons;



    // current question number
    scope.questionIndex = 0;

    // index of selected response
    scope.selectedResponse = -1;

    // get evaluation
    // TODO do beforehand, retrieve from API
    http.get('views/question/evaluation.json').success(function (data) {
      scope.questions = data.questions;
      console.log(scope.questions);
    });


    scope.scale = Array.apply( null, { length: 4 } );

    ///**
    // * Creates an array used by the ng-repeat in the surveyitem template to create response buttons.
    // * @param scaleType the type of scale for the current question
    // * @returns an array of intergers from 0-5 or 1-9
    // */
    //  // returns an array for ng-repeat to iterate through creating scale buttons
    //scope.provideScaleArray = function (scaleType) {
    //  var zeroFive = [0, 1, 2, 3, 4, 5];
    //  var oneNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //  var scaleArray;
    //  (scaleType == "0-5") ? scaleArray = zeroFive : scaleArray = oneNine;
    //
    //  return scaleArray;
    //};

    /**
     * Handler for Next button clicks.
     */
    scope.nextClick = function () {
      console.log("next Button Clicked");

      // save response

      window.localStorage["q" + scope.questions[scope.questionIndex].id] = parseInt(scope.selectedResponse);
      console.log("question " + (scope.questionIndex + 1) + " response saved " + window.localStorage["q" + scope.questions[scope.questionIndex].id]);

      // advance to next question
      scope.selectedResponse = -1;
      scope.questionIndex++;

      // check if end of survey reached
      if (scope.questionIndex + 1 > scope.questions.length) {
        console.log("End of survey");

        // if completed
        //$state.go('afterSurvey');
        // TODO finish
        return;
      }

      // clear selections
      for (var i in scope.buttons) {
        scope.buttons[i].className = "itembutton button";
      }

      // hide next button
      document.getElementById("nextButton").style.display = "none";

    };

    /**
     * Handler for response button clicks. Controls button style on selection and picking responses.
     * @param num element id of the button clicked
     */
    scope.numSelect = function numSelect(num) {
      //console.log(num + " passed to numSelect");

      if (scope.questions[scope.questionIndex].scale == "0-5") {
        numberOfButtons = 6;
      }
      else {
        numberOfButtons = 9;
      }

      //console.log("numberOfButtons: " + numberOfButtons);
      scope.buttons = new Array(numberOfButtons);
      //console.log(scope.buttons.length);

      // array of button elements for the current question
      for (var i = 0; i < scope.buttons.length; i++) {
        var button = document.getElementById(i);
        //console.log("looping " + i + " " + button);
        scope.buttons[i] = button;
      }

      //console.log("buttons array: " + scope.buttons);

      // button clicked by user
      var buttonPushed = document.getElementById(num);

      //console.log("button " + buttonPushed.innerHTML + " pushed");

      // show all buttons as deselected
      for (var i in scope.buttons) {
        scope.buttons[i].className = "itembutton button";
      }

      // apply selected style to button clicked by user
      buttonPushed.className += (" selecteditembutton");

      //
      scope.selectedResponse = buttonPushed.innerHTML;

      // make next button visible
      document.getElementById("nextButton").style.display = "";

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