GitHubApp.controller('issueCtrl', ['$scope', '$routeParams', '$location', 'RepoService', 'IssueService',
  function($scope, $routeParams, $location, RepoService, IssueService){

    var params = $routeParams;

    // find selected repo in RepoService's cache, to avoid having to fetch it again
    for(var i=0; i < RepoService._repos.length; ++i) {
      var _repo = RepoService._repos[i];
      if(_repo.full_name === params.user + '/' + params.repo) {
        $scope.repo = _repo;
      }
    }

    // when url is accessed directly, we will have to fetch repo info
    if(!$scope.repo) {
      RepoService.get(params.user, params.repo).then(function(_repo){
        if(_repo) {
          $scope.repo = _repo;
        }
      });
    }

    $scope.queryNextPage = function() {
      if(IssueService.headerInfo.pagination.nextPage) {
        IssueService.getNextPage().then(function(issues){
          $scope.headerInfo = IssueService.headerInfo;
          $scope.issues = IssueService._issues;
        });
      }
    }

    IssueService.search(params.user, params.repo).then(function(issues){
      $scope.issues = issues;
      $scope.headerInfo = IssueService.headerInfo;
    });

  }
]);
