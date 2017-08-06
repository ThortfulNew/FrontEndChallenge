angular.module('fec_templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('app.component.html','<h1>Hello!</h1>\r\n\r\n<search on-repositories="$ctrl.onRepositories(res)></search>');
$templateCache.put('detail/detail.component.html','');
$templateCache.put('search/search.component.html','<input ng-model="currentSearch">\r\n<button ng-click="search()">Search Repository</button>');
$templateCache.put('detail/issues-detail/issues-detail.component.html','');}]);