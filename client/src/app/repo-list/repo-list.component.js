(function (window) {
    'use strict';

    angular.module('frontEndChallenge').component('repoList', {
        templateUrl: 'repo-list/repo-list.component.html',
        controller: ["$scope", RepoListController],
        bindings: {
            repos: '<',
            onRepoClick: '&'
        }
    });

    function RepoListController($scope) {
        var vm = this;

        $scope.$watch(function () {
            return vm.repos
        }, function (newVal) {
            if (newVal && newVal.length) {
                initPagination(vm.repos);
            } else {
                vm.currentRepos = null;
                vm.pages = [];
            }
        })

        vm.displayIssues = function (username, repo, index) {
            vm.onRepoClick({ username: username, repo: repo, index: index })
        }

        vm.setPage = function (pageNum) {
            vm.currentRepos = vm.pages[pageNum];
            vm.currentPage = pageNum;
        }

        vm.isPageActive = function (pageNum) {
            return pageNum == vm.currentPage;
        }

        function initPagination(repos) {
            vm.currentPage = 0;
            vm.pages = getPages(repos, 4)
            vm.currentRepos = vm.pages[0];
        }

        function getPages(repos, pageSize) {
            var pages = [];

            while (repos.length > 0) {
                pages.push(repos.splice(0, pageSize));
            }

            return pages;
        }
    }

})(window);