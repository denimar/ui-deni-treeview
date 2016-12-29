var gulp = require('gulp');
var webserver = require('gulp-webserver');

module.exports = function() {

  gulp.src([
      './dist/',
      './',
      //'./examples/**/*.*',
      //'./examples/basic/api-usage/',
      //'./dist/',
      //'./src/ui-deni-treeview/examples'
    ])
    .pipe(webserver({
      //livereload: true,
      directoryListing: true,
      //fallback: './examples/basic/api-usage/index.html',
      open: true,
      port: 3001,
      //open: 'http://localhost:3000/examples/basic/api-usage/index.html'
    }));

}
