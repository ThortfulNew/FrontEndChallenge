var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function() {
      gulp.watch(['src/**'], ['build']);
};
