var gulp = require('gulp');
var sass = require('./sass.js')
var scripts = require('./scripts.js')

module.exports = function() {

	sass();
  scripts();

}
