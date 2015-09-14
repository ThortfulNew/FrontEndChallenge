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

    var repoService = {};

    repoService.paginationInfo = {};
    repoService.paginationInfo.currentPage = 1;
    repoService.paginationInfo.totalPages = 1;

    repoService.rateLimitInfo = {};
    repoService.rateLimitInfo.limit = null;
    repoService.rateLimitInfo.remaining = null;

    repoService._repos = [];

    /**
     * Github provides a special Link header on paginated API responses
     * based on: https://gist.github.com/niallo/3109252#gistcomment-1474669 
     */
    function _parseLinkHeader(header) {
      if (header.length === 0) {
        throw new Error("input must not be of zero length");
      }
      var parts = header.split(',');
      var links = {};
      for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
          throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
      }
      return links;
    }

    function _getNrOfPages(links) {
      if(links.last) {
        var regex = /&page=(\d+)/;
        return links.last.match(regex)[1];
      }
    }

    repoService._resource = $resource(
      "https://api.github.com/search/repositories?q=:q", {}, {
        query: {
          method: 'GET',
          isArray: true,
          transformResponse: function(data, headers){
            var headers = headers();
            console.log(headers);
            if(headers['link']) {
              var links = _parseLinkHeader(headers['link']);
              repoService.nrOfPages = _getNrOfPages(links);
              repoService.nextPage = links.next;
            }
            if(headers['x-ratelimit-limit']){
              repoService.rateLimitInfo.limit = parseInt(headers['x-ratelimit-limit']);
            }
            if(headers['x-ratelimit-remaining']){
              repoService.rateLimitInfo.remaining = parseInt(headers['x-ratelimit-remaining']);
            }
            return JSON.parse(data).items;
          }
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
    $scope.paginationInfo = RepoService.paginationInfo;
    $scope.rateLimitInfo = RepoService.rateLimitInfo;

    $scope.queryRepos = function() {
      $scope.repos = [];
      RepoService.search($scope.query).then(function(repos){
        RepoService.setRepos(repos);
        $scope.paginationInfo = RepoService.paginationInfo;
        $scope.rateLimitInfo = RepoService.rateLimitInfo;
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
