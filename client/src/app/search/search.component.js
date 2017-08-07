(function (window) {
    'use strict';

    angular.module('frontEndChallenge.search').component('search', {
        templateUrl: 'search/search.component.html',
        controller: ["searchService", "toaster", SearchController],
        bindings: {
            onRepos: '&',
            onLoading: '&'
        }
    });

    function SearchController(searchService, toaster) {
        var vm = this;

        vm.search = function () {
            vm.onLoading({ isLoading: true })
            vm.onRepos({ repos: null });
            searchService.getReposByName(vm.currentSearch)
                .then(function (data) {
                    vm.onRepos({ repos: data.items });
                })
                .catch(function (err) {
                    console.error("Error getting repos:", err)
                    toaster.pop('error', "Error", err.data.message)
                })
                .finally(function (err) {
                    vm.onLoading({ isLoading: false })
                })
        }
    }

})(window);