var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css'); //压缩文件大小
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// 编译sass
gulp.task('css', function () {
  gulp
    .src('./src/*.scss')
    .pipe(sass())
    .pipe(
    autoprefixer({
      browsers: ['last 2 versions', 'ie > 8'],
    }),
  )
    .pipe(cleanCSS())
    // .pipe(rename('xb.css'))
    .pipe(gulp.dest('./dist'));
});

// 这里的build对应package.json中的 gulp build
gulp.task('default', ['css']);
