(function (window) {
    'use strict';

    angular.module('frontEndChallenge.shared').filter('maxlength', function () {
        return function (str, length) {
            if (str) {
                return str.substr(0, length)
            }
        }
    });

})(window);