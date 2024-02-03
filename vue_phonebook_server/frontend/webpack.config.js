const path = require("path");

const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "source-map",

    target: ["web", "es5"],

    entry: "./js/script.js",

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "../public"),
        assetModuleFilename: "[path][name][ext]?[contenthash]"
    },

    devServer: {
        hot: true,
        open: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                type: "asset/resource"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
        }),
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
};