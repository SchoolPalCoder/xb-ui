const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const Components = require("../components.json");
const config = require("./config");

const webpackConfig = {
    mode: "production",
    entry: Components,
    output: {
        path: path.resolve(process.cwd(), "./lib"),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[id].js",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".ts"],
        alias: config.alias,
        modules: ["node_modules"],
    },
    externals: config.externals,
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: "tslint-loader",
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: "babel-loader",
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    preserveWhitespace: false,
                },
            },
            {
                test: /\.json$/,
                loader: "json-loader",
            },
            {
                test: /\.html$/,
                loader: "html-loader?minimize=false",
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: path.posix.join("static", "[name].[hash:7].[ext]"),
                },
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: path.posix.join("static", "[name].[hash:7].[ext]"),
                },
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: path.posix.join("static", "[name].[hash:7].[ext]"),
                },
            },
        ],
    },
    plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ],
};

module.exports = webpackConfig;
