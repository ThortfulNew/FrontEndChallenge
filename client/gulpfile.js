const gulp = require("gulp")
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const templateCache = require('gulp-angular-templatecache')

const appDir = "./src/app"
const distDir = '../server/public/'
const cachedTemplatesName = "templates"
const finalName = "frontEndChallenge"

const indexPage = "./src/index.html"

const cachedTemplates = distDir + '/templates.js'

const bootstrapCSS = "./bower_components/bootstrap/dist/css/bootstrap.css"
const bootstrapCSSMap = "./bower_components/bootstrap/dist/css/bootstrap.css.map"
const customCSS = "./src/style.css"

const angularJS = "./bower_components/angular/angular.js"
const modules = appDir + '/**/*.module.js'
const components = appDir + '/**/*.component.js'
const services = appDir + '/**/*.service.js'
const templates = appDir + '/**/*.component.html'
const filters = appDir + '/**/*.filter.js'



gulp.task('build-js', ["build-templates"], function () {

    const filesToBuild = [
        angularJS,
        cachedTemplates,
        modules,
        services,
        filters,
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
    return gulp.src([bootstrapCSS, bootstrapCSSMap, customCSS])
        .pipe(gulp.dest(distDir));
});

gulp.task('clean', function () {
    return gulp.src(distDir, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('build', function (cb) {
    runSequence('clean', ['build-index', 'build-css', 'build-js'], cb)

})

gulp.task('default', ['build']);