var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var del = require('del');
var config = require('./config');
var browserify = require('browserify');
var concat = require('gulp-concat');

gulp.task('usemin', function() {
  return gulp.src(config.src.lib)
    //.pipe(browserify())
    .pipe(uglify())
    .pipe(concat('tictactoe.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dist.app));
});

gulp.task('cleanBuild', function(cb){
  return del([config.dist.app], cb);
})
