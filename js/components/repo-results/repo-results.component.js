(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .component('repoResults', {
      templateUrl: 'js/components/repo-results/repo-results.template.html',
      controller: RepoResultsController
    });

  RepoResultsController.$inject = ['searchService', 'selectionService'];

  function RepoResultsController(searchService, selectionService) {
    var vm = this;

    vm.state = searchService.state;
    vm.select = select;
    vm.isSelected = selectionService.isSelected;

    function select(repo) {
      selectionService.select(repo);
    }
  }
})();
