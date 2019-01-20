/**
 * 根据svg生成字体文件
 */
"use strict";
const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const less = require("gulp-less");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const svgSprite = require("gulp-svg-sprites");
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
        targetPath: "../_spicons-icons.less",
        cssClass: "xbui-icon", //样式类名
        fontPath: "/fonts/",
      })
    )
    .pipe(
      iconfont({
        fontName: "spicons", // required
        prependUnicode: false, // recommended option
        formats: ["ttf", "eot", "woff", "svg"],
        normalize: true,
        fontHeight: 1001, // default, 'woff2' and 'svg' are available
      })
    )
    .pipe(gulp.dest("../src/styles/common/iconfont/fonts"));
});
