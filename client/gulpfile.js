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
const fontAwesomeCSS = "./bower_components/font-awesome/css/font-awesome.css"
const customCSS = "./src/style.css"

const angularJS = "./bower_components/angular/angular.js"
const angularSpinner = "./bower_components/angular-spinner/dist/angular-spinner.min.js"
const modules = appDir + '/**/*.module.js'
const components = appDir + '/**/*.component.js'
const services = appDir + '/**/*.service.js'
const templates = appDir + '/**/*.component.html'
const filters = appDir + '/**/*.filter.js'
const directives = appDir + '/**/*.directive.js'

const fontAwesomeFonts = "./bower_components/font-awesome/fonts/**.*"
const bootstrapFonts = "./bower_components/bootstrap/fonts/**.*"


gulp.task('build-js', ["build-templates"], function () {

    const filesToBuild = [
        angularJS,
        angularSpinner,
        cachedTemplates,
        modules,
        services,
        filters,
        directives,
        components
    ]

    return gulp.src(filesToBuild)
        .pipe(concat(finalName + '.js', { newLine: '\n' }))
        .pipe(gulp.dest(distDir))
		// .pipe(rename(finalName + '.min.js'))
		// .pipe(uglify())
		// .pipe(gulp.dest(distDir));
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
    return gulp.src([bootstrapCSS, bootstrapCSSMap, customCSS, fontAwesomeCSS])
        .pipe(gulp.dest(distDir));
});

gulp.task('build-fonts', function () {
    return gulp.src([fontAwesomeFonts, bootstrapFonts])
        .pipe(gulp.dest(distDir + "/fonts"));
});

gulp.task('clean', function () {
    return gulp.src(distDir, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('build', function (cb) {
    runSequence('clean', ['build-index', 'build-css', 'build-js', 'build-fonts'], cb)
})

gulp.task('default', ['build']);