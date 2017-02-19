'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babelify = require('babelify')
const browserify = require('gulp-browserify');

gulp.task('sass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

gulp.task('babel', () => {
    return gulp.src('src/js/main.js')
        .pipe(browserify({
            transform: [babelify]
        }))
        .pipe(gulp.dest('app/js'));
});


gulp.task('watch', ['sass', 'babel'], () => {
    gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss'], ['sass']);
    gulp.watch(['src/js/main.js'], ['babel']);
});



















