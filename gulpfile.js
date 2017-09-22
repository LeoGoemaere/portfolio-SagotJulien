'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
	  babel = require('gulp-babel'),
	  uglify = require('gulp-uglify'),
	  concat = require('gulp-concat'),
	  sourcemaps = require('gulp-sourcemaps'),
	  browserSync = require('browser-sync').create();



gulp.task('sass-maps', () => {
	return gulp.src('./scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
        browsers: ['last 2 versions'],
  	    cascade: false
    }))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist/css'));
})

gulp.task('sass-build', () => {
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

gulp.task('js-maps', () => {
	return gulp.src('js/components/*.js')
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(concat('bundle.js'))
	.pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('js-build', () => {
	return gulp.src('js/components/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(concat('bundle.js'))
	.pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});


gulp.task('js-concat', ['js'], () => {
	return gulp.src('./dist/js/components/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('serve', () => {
	browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('dist/js/bundle.js').on('change', browserSync.reload);
    gulp.watch('dist/css/*.css').on('change', browserSync.reload);
});


gulp.task('build', () => {
	gulp.start(['sass-build', 'sources', 'js-build']);
})

gulp.task('default', () => {
	gulp.start(['sass-maps', 'js-maps']);
});

gulp.task('dev', () => {
	gulp.watch('./scss/**/*.scss', ['sass-maps']);
	gulp.watch('./js/components/*.js', ['js-maps']);
});



