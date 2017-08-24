var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(){
    var watchFiles = [
       'dist/**'
    ];

    var browserConfig = {
        server: {
            baseDir: './dist'
        }
    };

    browserSync.init(watchFiles, browserConfig);
};
