'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
	  babel = require('gulp-babel'),
	  uglify = require('gulp-uglify'),
	  concat = require('gulp-concat');


gulp.task('sass', () => {
	return gulp.src('./scss/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
	.pipe(gulp.dest('./dist/css'));
})

gulp.task('sources', () => { 
	return gulp.src(['./assets/**/*.{jpg,png,gif,svg,ico}'])
	.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
	.pipe(gulp.dest('./dist/assets'));
});

gulp.task('js', () => {
	return gulp.src('js/components/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
    .pipe(gulp.dest('dist/js/components/'));
});

gulp.task('js-concat', ['js'], () => {
	return gulp.src('./dist/js/components/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});


gulp.task('build', () => {
	gulp.start(['sass', 'sources', 'js-concat']);
})

gulp.task('default', () => {
	gulp.watch('./scss/**/*.scss', ['sass']);
});



