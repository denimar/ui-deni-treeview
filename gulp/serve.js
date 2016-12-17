var gulp = require('gulp');
var webserver = require('gulp-webserver');

module.exports = function() {

  gulp.src([
      './',
      './examples/basic/lazy-load-by-event/',
      './dist/',
      './src/ui-deni-treeview/'
    ])
    .pipe(webserver({
      //livereload: true,
      //directoryListing: true,
      fallback: './examples/basic/lazy-load-by-event/index.html',
      open: true,
      port: 3001,
      //open: 'http://localhost:3000/index.html'
    }));

}
