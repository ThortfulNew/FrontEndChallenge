describe("GitHubApp", function(){
  beforeEach(module("GitHubApp"));
  describe("main page", function(){
    it("should have routes and controllers correctly setup", function(){
      inject(function($route) {
        expect($route.routes['/'].controller).to.equal('mainCtrl');
        expect($route.routes['/'].templateUrl).to.equal('pages/main.html');
      });
    });
  });
  describe("issues page", function(){
    inject(function($route) {
      it("should have routes and controllers correctly setup", function(){
        expect($route.routes['/repo/:user/:repo'].controller).to.equal('repoIssuesCtrl');
        expect($route.routes['/repo/:user/:repo'].templateUrl).to.equal('pages/repo-details.html');
      });
    });
  });
});
