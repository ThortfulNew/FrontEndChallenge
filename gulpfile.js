'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
var browserSync = require('browser-sync');

gulp.task('build:copy', tasks.build.copy);
gulp.task('build:stylus', tasks.build.stylus);
gulp.task('build', ['build:copy','build:stylus']);

gulp.task('loop', tasks.loop);
gulp.task('browser', tasks.browser);

gulp.task('default', ['build', 'loop', 'browser']);
