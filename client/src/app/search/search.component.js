(function (window) {
    'use strict';

    angular.module('frontEndChallenge.search').component('search', {
        templateUrl: 'search/search.component.html',
        controller: ["searchService", SearchController],
        bindings: {
            onRepos: '&'
        }
    });

    function SearchController(searchService) {
        var vm = this;

        vm.search = function () {
            searchService.getReposByName(vm.currentSearch)
                .then(function (data) {
                    console.log("Found them!", data)
                    vm.onRepos({ repos: data.items });
                })
                .catch(function (err) {
                    console.error(err)
                })
        }
    }

})(window);