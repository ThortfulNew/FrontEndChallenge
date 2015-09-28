var gulp = require('gulp');

module.exports = function(){
  var paths = [ './src/**'];
  return gulp.src(paths).pipe(gulp.dest('./dist/'));
};
