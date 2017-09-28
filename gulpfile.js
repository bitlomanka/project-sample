var gulp = require("gulp"),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),    
    browserSync = require('browser-sync'),
    postcss = require('gulp-postcss'),    
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

// pug
gulp.task('pug', function() {
 
  return gulp.src('app/source/pug/pages/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('app/source/'))
});


gulp.task('sass', function () {
	return gulp.src('app/source/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('app/source/css'));
});


// css/js/html
gulp.task('html', ['pug', 'sass'], function () {
    return gulp.src('app/source/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', postcss([
                autoprefixer({ browsers: ['last 2 versions'] }),
                cssnano
            ])
         ))        
        .pipe(gulp.dest('app/build'));
});

// картинки
gulp.task('images', function () {
  return gulp.src('app/source/images/**/*.*')
    .pipe(gulp.dest('app/build/images'));
});

// шрифты
gulp.task('fonts', function () {
  return gulp.src('app/source/fonts/**/*.*')
    .pipe(gulp.dest('app/build/css'));
});
    
// сервер dev
gulp.task('devServer', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app/source'
    }
  });
});

// сервер build
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app/build'
    }
  });
});

// слежка
gulp.task('watch', function () {    
  gulp.watch(['app/source/pug/**/*.pug'], ['pug', browserSync.reload]);
  gulp.watch(['app/source/sass/**/*.scss'], ['sass', browserSync.reload]);
  gulp.watch(['app/source/js/**/*.js'], [browserSync.reload]);
}); 


// сборка
gulp.task('build', ['html', 'images', 'fonts'], function(){
    gulp.start('server');
});

// таск по умолчанию
gulp.task('default', ['pug', 'sass', 'devServer', 'watch']);