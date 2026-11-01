(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .component('repoCard', {
      bindings: {
        repo: '<',
        active: '<',
        onSelect: '&'
      },
      templateUrl: 'js/components/repo-card/repo-card.template.html',
      controller: RepoCardController
    });

  function RepoCardController() {
    var vm = this;

    vm.select = select;

    function select() {
      vm.onSelect({ $event: vm.repo });
    }
  }
})();
