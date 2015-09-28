var gulp = require('gulp');
var stylus = require('gulp-stylus');


var build = {};

build.copy = function(){
  var paths = [
    '!src/stylus/',  // except src/stylus
    '.src/**'      // copy all files
  ];
  return gulp.src(paths).pipe(gulp.dest('./dist/'));
};

build.stylus = function(){
   var paths = [ 'src/stylus/main.styl'];
   return gulp.src(paths).pipe(stylus()).pipe(gulp.dest('./dist/css'));
};

module.exports.copy = build.copy;
module.exports.stylus = build.stylus;
