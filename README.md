[![Build Status](https://travis-ci.org/ESTR-eval-app/estr-eval-app-mobileweb.svg?branch=master)](https://travis-ci.org/ESTR-eval-app/estr-eval-app-mobileweb)
# ESTR Eval App Mobile-first Web App

## Install Notes

The application determines the endpoint for API requests using the `EVAL_N_HOST` environment variable, which should be set to the url or IP where the API can be found, for example, `somesite.com"`. When the application is built, a `config.js` file is generated which holds the url endpoint that should be used by the application, for example `http:somesite.com:3000/api`. This is required for all server requests to succeed.
Frontend dependencies are managed using Bower, and can be found in the `bower.json` file. To install them, run the following:

To install the application, ensure that the requred environment variable is set, then run:

```
npm install
```

This runs the Grunt build and installs the bower dependencies. Alternatively, you can run `grunt build` and `bower install` on their own to run the build tasks and install bower modules.

Once the application is installed correctly, ensure that the API is running and the application can access it, then you're good to go!
