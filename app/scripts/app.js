'use strict';

angular.module('musicPlayerApp', [
  'ngRoute',
  'audioPlayer-directive'
])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    })
    .filter('secondsToDateTime', [function() {
      return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
      };
    }]);
