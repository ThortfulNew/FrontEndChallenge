var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(){
    var watchFiles = [];

    var browserConfig = {
    };

    browserSync.init(watchFiles, browserConfig);
};
