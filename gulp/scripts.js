var gulp = require('gulp');
var babel = require("gulp-babel");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var path = require('path');

module.exports = function() {

  gulp.src('./src/ui-deni-treeview.module.js')

    .pipe(addsrc.append('./src/**/*.run.js'))
    .pipe(addsrc.append('./src/**/*.config.js'))
    .pipe(addsrc.append('./src/**/*.enum.js'))
    .pipe(addsrc.append('./src/**/*.constant.js'))
    .pipe(addsrc.append('./src/**/*.service.js'))
    .pipe(addsrc.append('./src/**/*.mock.js'))
    .pipe(addsrc.append('./src/**/*.controller.js'))
    .pipe(addsrc.append('./src/**/*.directive.js'))

    // Implement jshint
    .pipe(jshint('.jshintrc'))

    // Notify eventually errors
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join('\n');

      var pos = file.relative.lastIndexOf('\\');
      var fileName = file.relative.substr(pos + 1);

      return {
        title: fileName,
        message: errors,
        sound: 'Frog'
      }
    }))

    // Implement Babel
    .pipe(babel())

    // Concatenate all files into a one
    .pipe(concat(process.env.DIST_FOLDER + '/ui-deni-treeview.js'))

    // Throw above file into a dist folder
    .pipe(gulp.dest('./'))

    // Compress that file
    .pipe(rename(process.env.DIST_FOLDER + '/ui-deni-treeview.min.js'))

    // If eventually happened some error...
    .pipe(uglify().on("error", notify.onError(function(error) {
      console.log(error);

      var pos = error.message.indexOf('js:');
      var message = error.message.substr(pos + 4);

      return {
        message: message + ', line: ' + error.lineNumber,
        title: 'Scripts (Error)',
        sound: 'Frog'
      }
    }))) // notice the error event here

    // Throw the compressed file into a dist folder
    .pipe(gulp.dest('./'))
    .pipe((notify({
      title: 'Scripts successfully!',
      message: 'file: <%= file.relative %>',
      sound: null
    })))
    .pipe(livereload());

}
