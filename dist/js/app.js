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

    $scope.loadingAnimation = false;
    $scope.empty = true;

    $scope.searchGithub = function(){

      $scope.loadingAnimation = true;

      if($scope.query == ""){
        $scope.empty = true;
      }else{
        $scope.empty = false;
      }

      $http
        .get('https://api.github.com/search/repositories?q='+$scope.query)
        .success(function(data) {
            $scope.repos = data.items;
            $scope.loadingAnimation = false;

            console.log($scope.repos);
        });
    };

});
