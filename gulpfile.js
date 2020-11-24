'use strict'

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', gulp.series(function() {
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
}))

gulp.task('sass:watch', gulp.series(function() {
    gulp.watch('./css/*.scss', ['sass']);
}));

gulp.task('browser-sync', gulp.series(function() {
    var files = ['./*.html', './css/*.css', './images/*.{png, jpg}', './js/*.js']
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
}));
gulp.task('default', gulp.series(['browser-sync'], function() {
    gulp.start('sass:watch');
}));
gulp.task('clean', gulp.series(function() {
    return del(['dist']);
}));

gulp.task('imagemin', gulp.series(function() {
    return gulp.src('./images/*.{png,jpg,jpeg}')
        .pipe(imagemin({ optimizationLevel: 3, progessive: true, interlaced: true }))
}));

gulp.task('usemin', gulp.series(function() {
    return gulp.src('./*.html')
        .pipe(flatmap(function(stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function() { return htmlmin({ collapsWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']

                }));
        }))
        .pipe(gulp.dest('dist/'));
}));


gulp.task('build',
    gulp.series(gulp.parallel('imagemin', 'usemin'), function(done) {
        done
    }));