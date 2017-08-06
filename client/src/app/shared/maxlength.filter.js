(function (window) {
    'use strict';

    angular.module('frontEndChallenge.shared').filter('maxlength', function () {
        return function (str, length) {
            if (str.length > length) {
                return str.substr(0, length) + "..."
            } else {
                return str
            }
        }
    });

})(window);