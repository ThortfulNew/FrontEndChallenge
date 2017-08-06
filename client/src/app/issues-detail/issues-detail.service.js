(function (window) {
    'use strict';

    angular.module('frontEndChallenge.issues').factory('issuesService', ['$http', function ($http) {
        return {
            getIssues: function (username, reponame) {
                return $http.get("https://api.github.com/search/issues?q=repo:" + username + "/" + reponame)
                    .then(function (res) {
                        return res.data
                    })
            }
        }
    }]);



})(window);