(function (window) {
    'use strict';

    angular.module('frontEndChallenge.search').component('search', {
        templateUrl: 'search/search.component.html',
        controller: ["searchService", SearchController],
        bindings: {
            onRepos: '&',
            onLoading: '&'
        }
    });

    function SearchController(searchService) {
        var vm = this;

        vm.search = function () {
            vm.onLoading({ isLoading: true })
            searchService.getReposByName(vm.currentSearch)
                .then(function (data) {
                    vm.onRepos({ repos: data.items });
                })
                .catch(function (err) {
                    console.error(err)
                })
                .finally(function (err) {
                    vm.onLoading({ isLoading: false })
                })
        }
    }

})(window);