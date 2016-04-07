[![Build Status](https://travis-ci.org/ESTR-eval-app/estr-eval-app-mobileweb.svg?branch=master)](https://travis-ci.org/ESTR-eval-app/estr-eval-app-mobileweb)
# Eval n Mobile-first Web App

## Description
This mobile-first web application is the participant-facing portion of the system, which can be deployed either alongside or separately from the admin app. 

During development, it was accessed from the same url as the admin app with an Nginx web server directing traffic to `somesite.com/evaluate` to this application where the admin app url was `somesite.com`. It can also run using the built in node web server module by configuring the server in `Package.json` and running `npm start` .

For the web app to function correctly, it must have access to a running instance of the Eval n API, the endpoints for which are based on a url in `config.js`. These may be customized depending on the requirements of your specific deployment- see "Install Notes" below.v

## Install Notes

The application determines the endpoint for API requests using the `EVAL_N_HOST` environment variable, which should be set to the url or IP where the API can be found, for example, `somesite.com`. When the application is built, a `config.js` file is generated which holds the url endpoint that should be used by the application, for example `http:somesite.com:3000/api`. This is required for all server requests to succeed.
Frontend dependencies are managed using Bower, and can be found in the `bower.json` file. To install them, run the following:

To install the application, ensure that the required environment variable is set, then from the project directory run:

```
npm install
```

This runs a Grunt task to generate the config file for API endpoints and installs the bower dependencies. Alternatively, you can run `grunt build` and `bower install` on their own to run the build tasks and install bower modules.

Once the application is installed correctly, ensure that the API is running and the application can access it, then you're good to go!

## Evaluation Selection Screen

This screen shows all of the evaluations in "Published" status with finishing dates that have not yet passed. 

Evaluations can be added to this list by changing their status to "Published" in the admin app. or hidden by changing their status to "Closed". When the finish date for an evaluation passes, the evaluation is removed from the list.
Selecting the start button for an evaluation begins an evaluation.

## Completing an Evaluation

If the evaluation has been configured to ask for participant names, it will prompt for a name to be entered before continuing. Each question will then be displayed with the selected scale options and optional audio button if applicable. A response to each question must be given before the "Next" button becomes available. 

When the end of the evaluation has been reached, selecting the "Finish" button in the dialog shown will send the results to the server.
