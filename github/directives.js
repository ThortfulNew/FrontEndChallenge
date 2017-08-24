GitHubApp.directive("repoDirective", function(){
  return {
    restrict: "AE",
    templateUrl: "directives/repo.html",
    replace: true,
    scope: {
      repo: "="
    }
  }
});

GitHubApp.directive("issueDirective", function(){
  return {
    restrict: "AE",
    template: '<a href="{{ issue.html_url }}" class="list-group-item">{{ issue.title }}  <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>',
    replace: true,
    scope: {
      issue: "="
    }
  }
});

// from: http://codepen.io/TheLarkInn/blog/angularjs-directive-labs-ngenterkey 
GitHubApp.directive('dlEnterKey', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      var keyCode = event.which || event.keyCode;
      if (keyCode === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.dlEnterKey);
        });
        event.preventDefault();
      }
    });
  };
});
