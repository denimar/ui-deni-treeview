var gulp = require('gulp');
var webserver = require('gulp-webserver');

module.exports = function() {

  gulp.src([
      './',
      './examples/basic/example1/',
      './dist/',
      './src/ui-deni-treeview/'
    ])
    .pipe(webserver({
      //livereload: true,
      //directoryListing: true,
      fallback: './examples/basic/example1/index.html',
      open: true,
      port: 3001,
      //open: 'http://localhost:3000/index.html'
    }));

}
