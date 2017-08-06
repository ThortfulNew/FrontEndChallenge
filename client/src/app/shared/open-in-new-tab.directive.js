(function (window) {
    'use strict';

    angular.module('frontEndChallenge.shared').directive('openInNewTab', ["$window", function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var url = attrs.openInNewTab

                element.bind('click', function () {
                    console.log("clicked")
                    $window.open(url, '_blank');
                })

                element.css({ 'cursor': 'pointer' });
            }
        };
    }]);

})(window);