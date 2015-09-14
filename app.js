var GitHubApp = angular.module('GitHubApp', ['ngRoute', 'ngResource']);

GitHubApp.config(function($routeProvider){

  $routeProvider

    .when('/', {
      templateUrl: 'pages/main.html',
      controller: "mainCtrl"
    })

    .when('/repo/:user/:repo', {
      templateUrl: 'pages/repo-details.html',
      controller: "repoIssuesCtrl"
    });

});

/**
 * This service encapsulates the business logic.
 *
 * It exposes a high-level interface to the GitHub repository query and issue
 * query API backends:
 *  - searchForRepo
 *  - getRepoIssues
 */
GitHubApp.service('GitHubService', ['$resource',
  function($resource){

    function _arrayFromGithubAPI(data) {
      return JSON.parse(data).items;
    }

    var Repository = $resource(
      "https://api.github.com/search/repositories?q=:q", {}, {
        query: {
          method: 'GET',
          isArray: true,
          transformResponse: _arrayFromGithubAPI
        }
      }
    );

    this.searchForRepo = function query(query) {
      return Repository.query({
        q: query
      }).$promise;
    };


    var Issues = $resource(
      "https://api.github.com/repos/:userName/:repoName/issues",{}, {
        query: {
          method: 'GET',
          isArray: true
        }
      }
    );

    this.getRepoIssues = function get(userName, repoName) {
      return Issues.query({
        userName: userName,
        repoName: repoName
      }).$promise;
    }
  }
]);

/**
 * The main controller acts as an intermediary between the view presented to
 * the user and the business logic, encapsulated by `GitHubService`. We could
 * simply set `GitHubService` as a property of `$scope`, but wrapping service
 * functionality offers the controller the opportunity to enforce additonal
 * constraints/ set UI state before and after using the service.
 */
GitHubApp.controller('mainCtrl', ['$scope', '$location', '$routeParams', 'GitHubService',
  function($scope, $location, $routeParams, GitHubService){

    $scope.queryRepos = function() {
      $scope.repos = [];
      GitHubService.searchForRepo($scope.query).then(function(repos){
        $scope.repos = repos;
      });
    }

  }
]);

/**
 * This controller uses `GitHubService.getRepoIssues` to fetch the issues of
 * a repository on the repository details page. Each issue is rendered with
 * `issue-directive`.
 */
GitHubApp.controller('repoIssuesCtrl', ['$scope', '$routeParams', '$location', 'GitHubService',
  function($scope, $routeParams, $location, GitHubService){

    var params = $routeParams;

    GitHubService.getRepoIssues(params.user, params.repo).then(function(issues){
      console.log('issues: ', issues);
      $scope.issues = issues;
    });

  }
]);

GitHubApp.directive("repoDirective", function(){
  return {
    restrict: "AE",
    templateUrl: "directives/repo.html",
    replace: true,
    scope: {
      repo: "="
    }
  }
});

GitHubApp.directive("issueDirective", function(){
  return {
    restrict: "AE",
    template: '<li> {{ issue.title }} </li>',
    replace: true,
    scope: {
      issue: "="
    }
  }
});
