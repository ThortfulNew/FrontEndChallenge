module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/angular-resource/angular-resource.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/d3/d3.js',
      '*.js'
    ],
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    singleRun: false
  });
};
