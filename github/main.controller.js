GitHubApp.controller('mainCtrl', ['$scope', '$location', '$routeParams', 'RepoService',
  function($scope, $location, $routeParams, RepoService){

    $scope.repos = RepoService._repos;
    $scope.headerInfo = RepoService.headerInfo;

    $scope.queryRepos = function() {
      $scope.repos = [];
      RepoService.search($scope.query).then(function(repos){
        RepoService._repos = repos;
        $scope.headerInfo = RepoService.headerInfo;
        $scope.repos = repos;
      });
    }

    $scope.queryNextPage = function() {
      if(RepoService.headerInfo.pagination.nextPage) {
        RepoService.getNextPage().then(function(repos){
          $scope.headerInfo = RepoService.headerInfo;
          $scope.repos = RepoService._repos;
        });
      }
    }
  }
]);
