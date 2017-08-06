(function (window) {
    'use strict';

    angular.module('frontEndChallenge.search').factory('searchService', ['$http', function ($http) {
        return {
            getReposByName: function (name) {
                return $http.get("https://api.github.com/search/repositories?q=" + name)
                    .then(function (res) {
                        return res.data
                    })
            }
        }
    }]);



})(window);