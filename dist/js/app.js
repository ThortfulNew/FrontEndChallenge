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

app.controller('HomeController', function ($scope, $http) {

    $scope.searchGithub = function(){

      $http
        .get('https://api.github.com/search/repositories?q='+$scope.query)
        .success(function(data) {
            $scope.items = data.items;
            console.log($scope.items);
        });
    };
    
});
