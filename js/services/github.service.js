(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .factory('githubService', githubService);

  githubService.$inject = ['$http'];

  function githubService($http) {
    var API_ROOT = 'https://api.github.com';
    var JSON_HEADERS = { Accept: 'application/vnd.github+json' };

    return {
      searchRepositories: searchRepositories,
      searchIssues: searchIssues
    };

    function searchRepositories(query, limit) {
      return $http.get(API_ROOT + '/search/repositories', {
        params: { q: query, per_page: limit || 20 },
        headers: JSON_HEADERS
      }).then(function (response) {
        return response.data.items || [];
      });
    }

    function searchIssues(owner, repo, limit) {
      return $http.get(API_ROOT + '/search/issues', {
        params: {
          q: 'repo:' + owner + '/' + repo,
          per_page: limit || 30,
          sort: 'updated',
          order: 'desc'
        },
        headers: JSON_HEADERS
      }).then(function (response) {
        return response.data.items || [];
      });
    }
  }
})();
