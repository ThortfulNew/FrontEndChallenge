var GitHubApp = angular.module('GitHubApp', ['ngRoute', 'ngResource']);

GitHubApp.config(function($routeProvider){

  $routeProvider

    .when('/', {
      templateUrl: 'pages/main.html',
      controller: "mainCtrl"
    })

    .when('/repo/:user/:repo', {
      templateUrl: 'pages/repo-details.html',
      controller: "issueCtrl"
    });

});

GitHubApp.factory('RepoService', ['$resource',
  function($resource) {

    function _arrayFromGithubAPI(data) {
      return JSON.parse(data).items;
    }

    var repoService = {};

    repoService._repos = [];
    repoService._resource = $resource(
      "https://api.github.com/search/repositories?q=:q", {}, {
        query: {
          method: 'GET',
          isArray: true,
          transformResponse: _arrayFromGithubAPI
        }
      }           
    );

    repoService.search = function query(query) {
      return repoService._resource.query({
        q: query
      }).$promise;
    };

    repoService.setRepos = function setRepos(repos) {
      repoService._repos = repos;
    }

    return repoService;
  }
]);

GitHubApp.factory('IssueService', ['$resource',
  function($resource){

    var issueService = {};

    issueService._resource = $resource(
      "https://api.github.com/repos/:userName/:repoName/issues",{}, {
        query: {
          method: 'GET',
          isArray: true
        }
      }
    );

    issueService.search = function query(user, repo) {
      return issueService._resource.query({
        userName: user,
        repoName: repo
      }).$promise;
    };

    return issueService;
  }
]);

GitHubApp.controller('mainCtrl', ['$scope', '$location', '$routeParams', 'RepoService',
  function($scope, $location, $routeParams, RepoService){

    $scope.repos = RepoService._repos;

    $scope.queryRepos = function() {
      $scope.repos = [];
      RepoService.search($scope.query).then(function(repos){
        RepoService.setRepos(repos);
        $scope.repos = repos;
      });
    }
  }
]);

GitHubApp.controller('issueCtrl', ['$scope', '$routeParams', '$location', 'IssueService',
  function($scope, $routeParams, $location, IssueService){

    var params = $routeParams;

    IssueService.search(params.user, params.repo).then(function(issues){
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
    template: '<a href="{{ issue.html_url }}" class="list-group-item">{{ issue.title }}</a>',
    replace: true,
    scope: {
      issue: "="
    }
  }
});

// from: http://codepen.io/TheLarkInn/blog/angularjs-directive-labs-ngenterkey 
GitHubApp.directive('dlEnterKey', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      var keyCode = event.which || event.keyCode;
      if (keyCode === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.dlEnterKey);
        });
        event.preventDefault();
      }
    });
  };
});
