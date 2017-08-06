const gulp = require("gulp")
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const templateCache = require('gulp-angular-templatecache')

const sourceDir = "./src"
const distDir = '../server/public/'
const cachedTemplatesName = "templates"
const finalName = "frontEndChallenge"

const indexPage = "index.html"

const cachedTemplates = distDir + '/templates.js'

const bootstrapCSS = "./bower_components/bootstrap/dist/css/bootstrap.css"

const angularJS = "./bower_components/angular/angular.js"
const modules = sourceDir + '/**/*.module.js'
const components = sourceDir + '/**/*.component.js'
const services = sourceDir + '/**/*.service.js'
const templates = sourceDir + '/**/*.component.html'



gulp.task('build-js', ["build-templates"], function () {

    const filesToBuild = [
        angularJS,
        cachedTemplates,
        modules,
        services,
        components
    ]

    return gulp.src(filesToBuild)
        .pipe(concat(finalName + '.js', { newLine: '\n' }))
        .pipe(gulp.dest(distDir))
    //.pipe(rename(finalName + '.min.js'))
    //.pipe(uglify())
    //.pipe(gulp.dest(distDir));
});

gulp.task('build-templates', function () {
    return gulp.src(templates)
        .pipe(templateCache(cachedTemplatesName + ".js", {
            'module': 'fec_templates',
            'standalone': true
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('build-index', function () {
    return gulp.src(indexPage)
        .pipe(gulp.dest(distDir));
});

gulp.task('build-css', ["build-js"], function () {
    return gulp.src(bootstrapCSS)
        .pipe(gulp.dest(distDir));
});

gulp.task('clean', function () {
    return gulp.src(distDir, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('default', function (cb) {
    runSequence('clean', ['build-index', 'build-css', 'build-js'], cb)
});