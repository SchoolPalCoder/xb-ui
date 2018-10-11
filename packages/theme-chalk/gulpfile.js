var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css'); //压缩文件大小
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// 编译sass
gulp.task('css', function() {
  gulp
    .src('./src/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', 'ie > 8'],
      }),
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'));
});

// 拷贝字体文件
gulp.task('fonts', function() {
  gulp.src('./src/fonts/*.*').pipe(gulp.dest('../../lib/theme-chalk/fonts'));
});

// 这里的build对应package.json中的 gulp build
gulp.task('default', ['css', 'fonts']);
