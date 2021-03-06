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
	  browserSync = require('browser-sync').create(),
	  critical = require('critical'),
	  htmlmin = require('gulp-htmlmin'),
	  replace = require('gulp-replace');


const pkg = require('./package.json');

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

gulp.task('html', function() {
  return gulp.src('./index.html')
  	.pipe(replace('dist/', ''))
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	minifyJS: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sources', () => { 
	return gulp.src(['./assets/**/*.{jpg,png,gif,svg,ico}'])
	.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
	.pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy-videos', () => { 
	return gulp.src('./assets/**/*.mp4')
	.pipe(gulp.dest('./dist/assets'));
});

gulp.task('js-maps', () => {
	return gulp.src(['js/components/lazyload.js', 'js/**/*.js'])
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
	return gulp.src(['js/libraries/scrollreveal.js', 'js/**/*.js'])
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(concat('bundle.js'))
	.pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
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

gulp.task('critical', () => {
	
		critical.generate({
			src: pkg.critical.url,
			dest: "./critical/critical.css",
			include: [
				/.*\:hover/,
			],
			ignore: [
				"@font-face",
				/url\(/
			],
			base: "./",
			minify: true,
			width: 1200,
			height: 1200,
		}, (err, output) => {
			if (err) {
				console.error("failed, run gulp serve before launch critical task");
			}
		});

});

gulp.task('build', () => {
	gulp.start(['sass-build', 'sources', 'copy-videos', 'js-build', 'html']);
})

gulp.task('default', () => {
	gulp.start(['sass-maps', 'js-maps']);
});

gulp.task('dev', () => {
	gulp.watch('./scss/**/*.scss', ['sass-maps']);
	gulp.watch('./js/components/*.js', ['js-maps']);
});



