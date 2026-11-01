(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .factory('searchService', searchService);

  searchService.$inject = ['$timeout', 'githubService'];

  function searchService($timeout, githubService) {
    var MIN_QUERY_LENGTH = 2;
    var DEBOUNCE_MS = 400;

    var state = {
      query: '',
      results: [],
      loading: false,
      error: null,
      searched: false
    };

    var timer = null;

    return {
      state: state,
      search: search
    };

    function search(query) {
      state.query = query || '';

      if (timer) {
        $timeout.cancel(timer);
      }

      if (state.query.trim().length < MIN_QUERY_LENGTH) {
        state.results = [];
        state.error = null;
        state.loading = false;
        state.searched = false;
        return;
      }

      timer = $timeout(function () {
        state.loading = true;
        state.error = null;

        githubService.searchRepositories(state.query.trim()).then(function (items) {
          state.results = items;
          state.searched = true;
        }, function (response) {
          state.results = [];
          state.error = describeError(response);
        }).finally(function () {
          state.loading = false;
        });
      }, DEBOUNCE_MS);
    }

    function describeError(response) {
      if (response && (response.status === 403 || response.status === 429)) {
        return 'GitHub API rate limit reached. Wait a minute and try again.';
      }
      return 'Something went wrong while talking to GitHub. Please try again.';
    }
  }
})();
