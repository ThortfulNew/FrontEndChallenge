(function (window) {
    'use strict';

    angular.module('frontEndChallenge').component('repoList', {
        templateUrl: 'repo-list/repo-list.component.html',
        controller: [RepoListController],
        bindings: {
            repos: '<'
        }
    });

    function RepoListController() {
        var vm = this;
    }

})(window);