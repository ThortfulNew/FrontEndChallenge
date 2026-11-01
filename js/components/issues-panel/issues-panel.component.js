(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .component('issuesPanel', {
      templateUrl: 'js/components/issues-panel/issues-panel.template.html',
      controller: IssuesPanelController
    });

  IssuesPanelController.$inject = ['githubService', 'selectionService'];

  function IssuesPanelController(githubService, selectionService) {
    var vm = this;

    vm.store = selectionService.store;
    vm.issues = [];
    vm.loading = false;
    vm.error = null;

    vm.$onInit = activate;
    vm.iconFor = iconFor;
    vm.stateClass = stateClass;

    function activate() {
      selectionService.onChange(loadIssues);
    }

    function loadIssues(repo) {
      if (!repo) {
        return;
      }

      vm.loading = true;
      vm.error = null;
      vm.issues = [];

      githubService.searchIssues(repo.owner.login, repo.name).then(function (items) {
        vm.issues = items;
      }, function (response) {
        vm.error = response && response.status === 403
          ? 'GitHub API rate limit reached. Wait a minute and try again.'
          : 'Could not load issues for this repository.';
      }).finally(function () {
        vm.loading = false;
      });
    }

    function iconFor(issue) {
      if (issue.pull_request) {
        return 'bi-git-pull-request';
      }
      return issue.state === 'open' ? 'bi-check-circle-fill' : 'bi-x-circle-fill';
    }

    function stateClass(issue) {
      if (issue.pull_request) {
        return 'issue-pr';
      }
      return issue.state === 'open' ? 'issue-open' : 'issue-closed';
    }
  }
})();
