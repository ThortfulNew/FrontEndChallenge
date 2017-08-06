(function (window) {
    'use strict';

    angular.module('frontEndChallenge.issues').component('issuesDetail', {
        templateUrl: 'issues-detail/issues-detail.component.html',
        controller: ["$scope", "issuesService", IssuesDetailController],
        bindings: {
            parameters: "<"
        }
    });

    function IssuesDetailController($scope, issuesService) {
        var vm = this;

        $scope.$watch(function () {
            return vm.parameters
        }, function (newVal) {
            if (newVal && newVal.username && newVal.repo) {
                getIssues(newVal.username, newVal.repo)
            }
        })

        function getIssues(username, repo) {
            vm.username = username;
            vm.repo = repo;

            issuesService.getIssues(username, repo)
                .then(function (data) {
                    console.log("Issues are:", data)
                    initPagination(data.items);
                })
        }

        vm.setPage = function (pageNum) {
            vm.currentIssues = vm.pages[pageNum];
            vm.currentPage = pageNum;
            console.log(vm.currentPage, vm.currentIssues, vm.pages)
        }

        vm.isPageActive = function (pageNum) {
            return pageNum == vm.currentPage;
        }

        vm.isClosed = function (issue) {
            return issue.state == "closed"
        }

        function initPagination(issues) {
            vm.currentPage = 0;
            vm.pages = getPages(issues, 4)
            vm.currentIssues = vm.pages[0];
        }

        function getPages(issues, pageSize) {
            var pages = [];

            while (issues.length > 0) {
                pages.push(issues.splice(0, pageSize));
            }

            return pages;
        }
    }

})(window);