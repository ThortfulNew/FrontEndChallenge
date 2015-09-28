'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp');
var browserSync = require('browser-sync');

gulp.task('build', tasks.build);
gulp.task('loop', tasks.loop);
gulp.task('browser', tasks.browser);

gulp.task('default', ['browser']);
