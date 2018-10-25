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

    if (options.isProduction) {
      return ["vue-style-loader"].concat(loaders).concat(MiniCssExtractPlugin.loader);
    } else {
      return ["vue-style-loader"].concat(loaders);
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
  };
};

module.exports.vueLoaderConfig = (options) => {
  return {
    loaders: cssLoaders({
      sourceMap: !options.isProduction,
      isProduction: options.isProduction,
    }),
    transformToRequire: {
      video: "src",
      source: "src",
      img: "src",
      image: "xlink:href",
    },
  };
};

module.exports.miniCssExtractPlugin = (options) => {
  return new MiniCssExtractPlugin({
    filename: options.isProduction ? "[name].[hash].css" : "[name].css",
    chunkFilename: options.isProduction ? "[id].[hash].css" : "[id].css",
  });
};
