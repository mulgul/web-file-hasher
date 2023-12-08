const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './public/bundle.js',
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.png'
        }),
        new CopyPlugin({
            patterns: [
              { from: "./public/assets", to: "./assets" },
              { from: "./public/reset.css", to: "./" },
              { from: "./public/styles.css", to: "./" }
            ],
          }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        compress: true,
        port: 8080,
    },
};
