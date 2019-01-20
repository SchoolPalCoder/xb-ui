/**
 * 根据svg生成字体文件
 */
"use strict";
const gulp = require("gulp");
const iconfont = require("gulp-iconfont");
const iconfontCss = require("gulp-iconfont-css");

//生成图标字体文件
gulp.task("Iconfont", function() {
  return gulp
    .src(["../../assets/iconfontSvg/*.svg"])
    .pipe(
      iconfontCss({
        fontName: "xbui-icons", //字体名
        path: "../../assets/templates/iconFont.less", //模板文件路径
        targetPath: "../xb-icon.less",
        cssClass: "xbui-icon", //样式类名
        fontPath: "/fonts/",
      })
    )
    .pipe(
      iconfont({
        fontName: "xbui-icons", // required
        prependUnicode: false, // recommended option
        formats: ["ttf", "eot", "woff", "svg"],
        normalize: true,
        fontHeight: 1001, // default, 'woff2' and 'svg' are available
      })
    )
    .pipe(gulp.dest("../../packages/theme-chalk/src/fonts"));
});

gulp.task("default", ["Iconfont"]);
