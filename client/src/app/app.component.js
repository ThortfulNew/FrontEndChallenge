(function (window) {
    'use strict';

    angular.module('frontEndChallenge').component('app', {
        templateUrl: 'app.component.html',
        controller: AppController,
        bindings: {}
    });

    function AppController() {
        var vm = this;

        vm.onRepos = function (repos) {
            vm.issueParameters = null;
            vm.repos = repos;
            console.log("Got them!", repos)
        }

        vm.displayIssues = function (username, repo, index) {
            vm.selectedIssue = index;
            console.log("App displaying issues", username, repo)
            vm.issueParameters = {
                username: username,
                repo: repo
            }
        }

        vm.isSelectedIssue = function (issueIndex) {
            return vm.selectedIssue == issueIndex
        }

        vm.closeIssues = function () {
            vm.selectedIssue = null;
            vm.issueParameters = null;
        }
    }

})(window);