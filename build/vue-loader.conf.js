"use strict";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoaders = function(options) {
  options = options || {};

  const cssLoader = {
    loader: "css-loader",
    options: {
      minimize: process.env.NODE_ENV === "production",
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    return ["vue-style-loader"].concat(loaders);
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
    ts: "ts-loader",
  };
};

module.exports = {
  loaders: cssLoaders({
    sourceMap: true,
  }),
  transformAssetUrls: {
    video: "src",
    source: "src",
    img: "src",
    image: "xlink:href",
  },
};
