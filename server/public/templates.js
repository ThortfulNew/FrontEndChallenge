angular.module('fec_templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('app.component.html','<div class="container">\r\n    <h1 class="text-center" style="margin-bottom: 50px">Github repository search</h1>\r\n    <search on-repos="$ctrl.onRepos(repos)"></search>\r\n    <div class="row">\r\n        <div class="col-sm-6">\r\n            <repo-list ng-if="$ctrl.repos" repos="$ctrl.repos" on-repo-click="$ctrl.displayIssues(username, repo, index)" is-selected-issue="$ctrl.isSelectedIssue"></repo-list>\r\n        </div>\r\n        <div ng-if="$ctrl.issueParameters" class="col-sm-6" style="margin-top: 70px; border: 1px solid black; border-radius: 5px">\r\n            <i class="fa fa-window-close close-button" aria-hidden="true" ng-click="$ctrl.closeIssues()"></i>\r\n            <issues-detail parameters="$ctrl.issueParameters">\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('issues-detail/issues-detail.component.html','<div ng-show="$ctrl.currentIssues.length">\r\n\r\n    <h3>Issues in github.com/{{$ctrl.username + "/" + $ctrl.repo}}:</h3>\r\n\r\n    <div ng-repeat="issue in $ctrl.currentIssues" class="row">\r\n        <div class="col-sm-12">\r\n            <a href="{{issue.html_url}}" target="_blank">\r\n                <h4>{{issue.title}}</h4>\r\n            </a>\r\n            <p ng-show="issue.body"><span class="field-name">Description: </span>{{issue.body | maxlength:250}}</p>\r\n            <p open-in-new-tab="{{issue.assignee.html_url}}" ng-if="issue.assignee"><span class="field-name">Assignee: </span>{{issue.assignee.login}}</p>\r\n            <p><span class="field-name">State: </span>{{issue.state}} <span class="glyphicon glyphicon-{{$ctrl.isClosed(issue) ? \'ok\' : \'remove\'}}"\r\n                    ng-class="{closed: $ctrl.isClosed(issue), open: !$ctrl.isClosed(issue)}"></span></p>\r\n            <p><span class="field-name">Created at: </span>{{issue.created_at | date}}</p>\r\n            <p ng-hide="$ctrl.isClosed(issue)"><span class="field-name">Updated at: </span>{{issue.updated_at | date}}</p>\r\n            <p ng-show="$ctrl.isClosed(issue)"><span class="field-name">Closed at: </span>{{issue.closed_at | date}}</p>\r\n            <p>\r\n        </div>\r\n    </div>\r\n\r\n    <ul ng-if="$ctrl.pages.length > 1" class="pagination">\r\n        <li ng-repeat="page in $ctrl.pages track by $index" ng-class="{active: $ctrl.isPageActive($index)}" ng-click="$ctrl.setPage($index)"><a href="#">{{$index + 1}}</a></li>\r\n    </ul>\r\n</div>\r\n\r\n<div ng-hide="$ctrl.currentRepos.length" style="padding: 20px">\r\n    No issues found in github.com/{{$ctrl.username + "/" + $ctrl.repo}}\r\n</div>');
$templateCache.put('repo-list/repo-list.component.html','<h2>Repositories list</h2>\r\n\r\n<div ng-show="$ctrl.currentRepos.length">\r\n    <div ng-repeat="repo in $ctrl.currentRepos track by $index" class="row" ng-class="{\'active-issue\': $ctrl.isSelectedIssue($index)}">\r\n        <div class="col-sm-12">\r\n            <h3 style="cursor: pointer;text-decoration: underline" ng-click="$ctrl.displayIssues(repo.owner.login, repo.name, $index)">{{repo.full_name}}</h3>\r\n            <p ng-show="repo.description"><span class="field-name">Description: </span>{{repo.description}}</p>\r\n            <p open-in-new-tab="{{repo.owner.html_url}}"><span class="field-name">Owner: </span>{{repo.owner.login}}</p>\r\n            <p><span class="field-name">Updated at: </span>{{repo.updated_at | date}}</p>\r\n            <p ng-show="repo.language"><span class="field-name">Language: </span>{{repo.language}}</p>\r\n            <p><span class="field-name">Stars: </span>{{repo.stargazers_count}}</p>\r\n            <p><span class="field-name">Forks: </span>{{repo.forks}}</p>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <ul ng-if="$ctrl.pages.length > 1" class="pagination">\r\n        <li ng-repeat="page in $ctrl.pages track by $index" ng-class="{active: $ctrl.isPageActive($index)}" ng-click="$ctrl.setPage($index)"><a href="#">{{$index + 1}}</a></li>\r\n    </ul>\r\n</div>\r\n\r\n<div ng-hide="$ctrl.currentRepos.length">\r\n    No repositories found\r\n</div>');
$templateCache.put('search/search.component.html','<form ng-submit="$ctrl.search()">\r\n    <div class="input-group">\r\n        <input class="form-control" ng-model="$ctrl.currentSearch" placeholder="Repository name">\r\n        <span class="input-group-btn">\r\n            <button class="btn btn-primary" type="submit" style="margin-left: 10px">Search Repository</button>\r\n        </span>\r\n    </div>\r\n</form>');}]);