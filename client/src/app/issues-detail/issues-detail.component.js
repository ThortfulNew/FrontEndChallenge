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
        }, true)

        function getIssues(username, repo) {
            vm.username = username;
            vm.repo = repo;

            issuesService.getIssues(username, repo)
                .then(function (data) {
                    console.log("Issues are:", data)
                    vm.issues = data.items;
                })
        }
    }

})(window);