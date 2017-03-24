var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sync = require('gulp-sync')(gulp);
var config = require('./gulp/config')
var requireDir = require('require-dir');
var tasks = requireDir('gulp', {recurse: true});



// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/*.js", ['js-watch']);
});


gulp.task('dist', sync.sync(['cleanBuild', ['usemin']]), function(){

});
