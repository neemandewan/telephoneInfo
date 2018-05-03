var app = angular.module('app', [
    'ngRoute', 
    'ngSanitize', 
    'ngCookies', 
    'base64', 
    'angularSpinner'
]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/templates/main/index.html',
            controller: mainCtrl,
            reloadOnSearch: false
        }).
        when('/main', {
            templateUrl: '/templates/main/index.html',
            controller: mainCtrl,
            reloadOnSearch: false
        }).
        otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});