const gulp = require("gulp")
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const templateCache = require('gulp-angular-templatecache')

const sourceDir = "./src"
const distDir = './dist'
const cachedTemplatesName = "templates"
const finalName = "frontEndChallenge"

const angularJS = "./bower_components/angular/angular.js"
const modules = sourceDir + '/**/*.module.js'
const components = sourceDir + '/**/*.component.js'
const templates = sourceDir + '/**/*.component.html'
const cachedTemplates = distDir + '/templates.js'

gulp.task('build', ["build-templates"], function () {

    const filesToBuild = [
        angularJS,
        cachedTemplates,
        modules,
        components
    ]

    return gulp.src(filesToBuild)
        .pipe(concat(finalName + '.js', { newLine: '\n' }))
        .pipe(gulp.dest(distDir))
        .pipe(rename(finalName + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distDir));
});

gulp.task('build-templates', function () {
    return gulp.src(templates)
        .pipe(templateCache(cachedTemplatesName + ".js", {
            'module': 'fec_templates',
            'standalone': true
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('clean', function () {
    return gulp.src(distDir)
        .pipe(clean({ force: true }))
        .pipe(gulp.dest(distDir));
});