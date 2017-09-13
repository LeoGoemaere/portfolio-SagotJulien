'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass');


gulp.task('sass', () => {
	return gulp.src('./scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./dist/css'));

})

gulp.task('default', () => {
	gulp.watch('./scss/**/*.scss', ['sass']);
});



