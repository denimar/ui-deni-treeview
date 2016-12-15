var gulp = require('gulp');

//distribution folder
process.env.DIST_FOLDER = './dist';

//own modules
var dist = require('./gulp/dist.js')
var serve = require('./gulp/serve.js')
var watch = require('./gulp/watch.js')

gulp.task('default', function() {
  dist();
  serve();
  watch();
});
