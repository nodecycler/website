const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => ({
    entry: "./src/index.js",
    output: {
        filename: '[name].[hash].js',
    },
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    options.mode === "development" ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyPlugin([
                {from: "./src/assets"},
            ],
        ),

    ]
});
