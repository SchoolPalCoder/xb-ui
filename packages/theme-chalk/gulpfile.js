const gulp = require("gulp");
const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

// 编译less
gulp.task("compileCss", function() {
  gulp
    .src("./src/*.less")
    .pipe(less())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "ie > 8"],
        cascade: false,
      })
    )
    // .pipe(cleanCSS())
    .pipe(cleanCss())
    .pipe(gulp.dest("../../lib/theme-chalk"));
});

// 拷贝字体文件
gulp.task("copyFonts", function() {
  gulp
    .src("./src/fonts/*.*")
    .pipe(cleanCss())
    .pipe(gulp.dest("../../lib/theme-chalk/fonts"));
});

// 这里的build对应package.json中的 gulp build
gulp.task("default", ["compileCss", "copyFonts"]);
