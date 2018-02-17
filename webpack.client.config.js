var webpack = require('webpack');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        qdb: './src/app'
    },
    output: {
        path: path.resolve('./dist/'),
        filename: '[name].bundle.js'
    },
    cache: true,
    devtool: 'inline-cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                exclude: /api.ts/, // API is auto-generated by swagger-codegen
                loader: 'tslint-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true,
                    failOnHint: true
                },
                enforce: 'pre'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                })
            }
        ],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin([]),
        // new webpack.optimize.DedupePlugin()
        new ExtractTextPlugin({
            filename: 'qdb.bundle.css',
            allChunks: true
        }),
        // new CopyWebpackPlugin([
        //     { from: "static" } // Copy contents of /static to /dist/client/
        // ])
    ],
}
