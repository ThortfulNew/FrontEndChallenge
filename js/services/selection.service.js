(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .factory('selectionService', selectionService);

  function selectionService() {
    var store = { repo: null };
    var listeners = [];

    return {
      store: store,
      select: select,
      isSelected: isSelected,
      onChange: onChange
    };

    function select(repo) {
      store.repo = repo;
      listeners.forEach(function (listener) {
        listener(repo);
      });
    }

    function isSelected(repo) {
      return !!store.repo && store.repo.id === repo.id;
    }

    function onChange(listener) {
      listeners.push(listener);
    }
  }
})();
