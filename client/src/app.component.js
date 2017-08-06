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
            vm.repos = repos;
            console.log("Got them!", repos)
        }
    }

})(window);