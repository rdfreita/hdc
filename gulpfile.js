var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var inject = require('gulp-inject');


// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'files'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'files'}, reload);
});

gulp.task('less', function () {
  return gulp.src('./less/hdc/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./files/css'));
});

gulp.task('all', function () {
  return gulp.src('./files/*.html')
  .pipe(inject (gulp.src([
    './files/css/bootstrap.min.css',
    './files/css/estilo.css',
    './files/css/material-fullpalette.min.css',
    './files/css/material.min.css',
    './files/css/ripples.min.css',
    './files/css/roboto.min.css',
    './files/js/*.js'], {read: false}), {relative: true}))
  .pipe(gulp.dest('./files'));
});

