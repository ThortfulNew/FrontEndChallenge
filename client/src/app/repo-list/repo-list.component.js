(function (window) {
    'use strict';

    angular.module('frontEndChallenge').component('repoList', {
        templateUrl: 'repo-list/repo-list.component.html',
        controller: [RepoListController],
        bindings: {
            repos: '<',
            onRepoClick: '&'
        }
    });

    function RepoListController() {
        var vm = this;

        vm.displayIssues = function (username, repo) {
            console.log("sent repo click", username, repo)
            vm.onRepoClick({ username: username, repo: repo })
        }
    }

})(window);