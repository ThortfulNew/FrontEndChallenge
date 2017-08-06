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
            }
        })

        vm.displayIssues = function (username, repo) {
            console.log("sent repo click", username, repo)
            vm.onRepoClick({ username: username, repo: repo })
        }

        vm.setPage = function (pageNum) {
            vm.currentRepos = vm.pages[pageNum];
            vm.currentPage = pageNum;
            console.log(vm.currentPage, vm.currentRepos, vm.pages)
        }

        vm.isPageActive = function (pageNum) {
            return pageNum == vm.currentPage;
        }

        function initPagination(repos) {
            vm.currentPage = 0;
            vm.pages = getPages(repos, 5)
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