var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var clean = require('gulp-clean-css');
var electron = require('electron-connect').server.create();

gulp.task('js-compile', function() {
    var bundler = browserify({
        entries: ['./src/js/root.js']
    }).transform(babelify, { presets: ['es2015', 'react'] });
    return bundler.bundle()
           .pipe(source('bundle.js'))
           .pipe(gulp.dest('./app/lib/js/'))
           .pipe(buffer())
           .pipe(sourcemaps.init())
           .pipe(uglify())
           .pipe(sourcemaps.write('./maps/'))
           .pipe(rename({extname: '.min.js'}))
           .pipe(gulp.dest('./app/dest/js/'));
});

gulp.task('less-compile', function() {
    return gulp.src('./src/less/style.less')
           .pipe(less())
           .pipe(gulp.dest('./app/lib/css/'))
           .pipe(sourcemaps.init())
           .pipe(clean())
           .pipe(sourcemaps.write('./maps/'))
           .pipe(rename({extname: '.min.css'}))
           .pipe(gulp.dest('./app/dest/css/'));
});

gulp.task('css-compile', function() {
    return gulp.src('./src/css/*.css')
           .pipe(gulp.dest('./app/lib/css/'))
           .pipe(sourcemaps.init())
           .pipe(clean())
           .pipe(sourcemaps.write('./maps/'))
           .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./app/dest/css/'));
});

gulp.task('electron', ['js-compile', 'less-compile', 'css-compile'], function() {
    electron.start();
    gulp.watch('./app/*.js', electron.restart);
    gulp.watch('./app/*.html', electron.reload);
    gulp.watch('./app/lib/css/*.css', electron.reload);
    gulp.watch('./app/lib/js/*.js', electron.reload);
});

gulp.task('watch', function() {
    gulp.watch('./src/js/**/*.js', ['js-compile']);
    gulp.watch('./src/less/*.less', ['less-compile']);
    gulp.watch('./src/css/*.css', ['css-compile']);
});

gulp.task('default', ['electron', 'watch']);
