GitHubApp.factory('RepoService', ['$rootScope', '$resource',
  function($rootScope, $resource) {

    var repoService = {};

    repoService._repos = [];

    repoService._resource = $resource(
      "https://api.github.com/search/repositories?q=:q", {}, {
        query: {
          isArray: true,
          transformResponse: function(data, headers){
            return JSON.parse(data).items;
          },
          interceptor: {
            response: function(data) {
              $rootScope.extendWithHeaderInfo(repoService, data.headers());
              return data.data;
            }
          }
        }
      }           
    );

    repoService.search = function query(query) {
      return repoService._resource.query({
        q: query
      }).$promise;
    };

    repoService.get = function get(user, repo) {
      var repoResource = $resource("https://api.github.com/repos/" + user + "/" + repo, {}, {
        get: {
          interceptor: {
            response: function(data) {
              $rootScope.extendWithHeaderInfo(repoService, data.headers());
              return data.data;
            }
          }
        }
      });
      return repoResource.get().$promise;
    };

    repoService.getNextPage = function getNextPage() {
      var nextPageResource = $resource(repoService.headerInfo.pagination.nextPage, {}, {
        query: {
          isArray: true,
          transformResponse: function(data, headers){
            return JSON.parse(data).items;
          },
          interceptor: {
            response: function(data) {
              $rootScope.extendWithHeaderInfo(repoService, data.headers());
              repoService._repos = repoService._repos.concat(data.data);
              return data.data;
            }
          }
        }
      });
      return nextPageResource.query().$promise;
    }           

    return repoService;
  }
]);
