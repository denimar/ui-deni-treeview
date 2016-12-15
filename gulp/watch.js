var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('./sass.js');
var scripts = require('./scripts.js');

module.exports = function() {

	gulp.watch('src/**/*.scss', function() {
		sass();
	});

  gulp.watch('src/**/*.js', function() {
		scripts();
	});

	// Create LiveReload server
	livereload.listen({
		basePath: process.env.DIST_FOLDER
	});

}
