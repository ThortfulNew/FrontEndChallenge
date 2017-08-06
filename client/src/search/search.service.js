(function (window) {
    'use strict';

    angular.module('frontEndChallenge.search').factory('MyService', ['$http', function () {
        return {
            getRepositoriesByName: function (name) {
                return $http.get("https://api.github.com/search/repositories?q=" + name)
            }
        }
    }]);



})(window);