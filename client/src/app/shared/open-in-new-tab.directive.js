(function (window) {
    'use strict';

    angular.module('frontEndChallenge.shared').directive('openInNewTab', ["$window", function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var url = attrs.openInNewTab

                element.bind('click', function () {
                    $window.open(url, '_blank');
                })

                if (element[0].tagName !== "BUTTON") {
                    element.addClass("link");
                }
            }
        };
    }]);

})(window);