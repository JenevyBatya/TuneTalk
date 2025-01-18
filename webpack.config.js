const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        mode: isProduction ? "production" : "development",
        entry: "./src/index.js",
        output: {
            filename: isProduction
                ? "js/[name].[contenthash].js"
                : "js/[name].js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : "style-loader",
                        "css-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|mp3|ttf|woff|woff2|eot)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "assets/[name][ext]",
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                minify: isProduction,
            }),
            new MiniCssExtractPlugin({
                filename: isProduction
                    ? "css/[name].[contenthash].css"
                    : "css/[name].css",
            }),
            new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: false,
            }),
            new Dotenv(),
            new CleanWebpackPlugin(),
],
        devServer: {
            static: [
                path.resolve(__dirname, "public"),
                path.resolve(__dirname, "dist"),
            ],
            compress: true,
            port: 3000,
            historyApiFallback: true,
            open: true,
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
            runtimeChunk: "single",
        },
        resolve: {
            extensions: [".js", ".jsx"],
            fallback: {
                process: require.resolve("process/browser"),
            },
        },
    };
};
