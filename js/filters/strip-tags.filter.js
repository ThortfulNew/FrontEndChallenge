(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .filter('stripTags', function () {
      return function (text) {
        return String(text == null ? '' : text).replace(/<[^>]*>/g, '');
      };
    });
})();
