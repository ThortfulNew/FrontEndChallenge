GitHubApp.factory('IssueService', ['$rootScope', '$resource',
  function($rootScope, $resource){

    var issueService = {};

    issueService._issues = [];

    issueService._resource = $resource(
      "https://api.github.com/repos/:userName/:repoName/issues",{}, {
        query: {
          isArray: true,
          interceptor: {
            response: function(data) {
              $rootScope.extendWithHeaderInfo(issueService, data.headers());
              issueService._issues = issueService._issues.concat(data.data);
              return data.data;
            }
          }
        }
      }
    );

    issueService.search = function query(user, repo, url) {
      return issueService._resource.query({
        userName: user,
        repoName: repo
      }).$promise;
    };

    issueService.getNextPage = function getNextPage() {
      var nextPageResource = $resource(issueService.headerInfo.pagination.nextPage, {}, {
        query: {
          isArray: true,
          interceptor: {
            response: function(data) {
              $rootScope.extendWithHeaderInfo(issueService, data.headers());
              issueService._issues = issueService._issues.concat(data.data);
              return data.data;
            }
          }
        }
      });
      return nextPageResource.query().$promise;
    }           

    return issueService;
  }
]);
