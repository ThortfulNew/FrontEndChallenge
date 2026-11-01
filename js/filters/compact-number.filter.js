(function () {
  'use strict';

  angular
    .module('thortfulApp')
    .filter('compactNumber', function () {
      var formatter = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
      return function (value) {
        return formatter.format(Number(value) || 0);
      };
    });
})();
