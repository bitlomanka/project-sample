var gulp = require("gulp"),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    minifyCss = require('gulp-minify-css'),
    mainBowerFiles = require('main-bower-files');

gulp.task('css-bower', function() {
    return gulp.src(mainBowerFiles('**/*.css'))        
        .pipe(gulp.dest('app/source/css/lib'));
});

gulp.task('css', ['css-bower'], function () {
  return gulp.src('app/source/css/**/*.css')
    .pipe(concatCss('bundle.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('app/build/css'));
});

gulp.task('html', function () {
  return gulp.src('app/source/*.html')
    .pipe(gulp.dest('app/build/'));
});

gulp.task('images', function () {
  return gulp.src('app/source/images/**/*.*')
    .pipe(gulp.dest('app/build/images'));
});

// font
gulp.task('fonts', function () {
  return gulp.src('app/source/fonts/**/*.*')
    .pipe(gulp.dest('app/build/fonts'));
});


gulp.task('js-bower', function() {
    return gulp.src(mainBowerFiles('**/*.js'))        
        .pipe(gulp.dest('app/source/js/lib'));
});

gulp.task('js', ['js-bower'], function() {
    return gulp.src('app/source/js/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/js'));
});

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app/build'
    }
  });
});

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/source/*.html',
    'app/source/js/**/*.js',
    'app/source/css/**/*.css',
    'app/source/images/**/*.*',
  ], ['compile', browserSync.reload]);
});

gulp.task('compile', ['html', 'fonts', 'css', 'images', 'js']);

// Задача по-умолчанию
gulp.task('default', ['compile', 'server', 'watch']);

