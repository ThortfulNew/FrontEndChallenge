var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: '/views/home.html',
        controller: 'HomeController',
      });

    $urlRouterProvider.otherwise("/");
});

app.controller('HomeController', function ($scope) {
});
