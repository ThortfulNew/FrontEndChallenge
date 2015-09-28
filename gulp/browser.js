var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(){
    var watchFiles = [
       'public/**'
    ];

    var browserConfig = {
        server: {
            baseDir: './public'
        }
    };

    browserSync.init(watchFiles, browserConfig);
};
