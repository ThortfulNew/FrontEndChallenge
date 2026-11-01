(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .component('searchBar', {
      templateUrl: 'js/components/search-bar/search-bar.template.html',
      controller: SearchBarController
    });

  SearchBarController.$inject = ['searchService'];

  function SearchBarController(searchService) {
    var vm = this;

    vm.query = searchService.state.query;
    vm.search = search;
    vm.submit = submit;

    function search() {
      searchService.search(vm.query);
    }

    function submit($event) {
      $event.preventDefault();
      searchService.search(vm.query);
    }
  }
})();
