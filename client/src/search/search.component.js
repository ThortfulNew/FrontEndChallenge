(function (window) {
    'use strict';

    angular.module('frontEndChallenge').component('search', {
        templateUrl: 'search.component.html',
        controller: ["searchService", SearchController],
        bindings: {
            onSearch: '&'
        }
    });

    function SearchController(searchService) {
        var vm = this;

        vm.search = function () {
            searchService.getRepositoriesByName(vm.currentSearch)
                .then(function (res) {
                    console.log("Found them!", res)
                    vm.onRepositories(res);
                })
                .catch(function (err) {
                    console.error(err)
                })
        }
    }

})(window);