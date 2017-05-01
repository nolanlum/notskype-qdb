var webpack = require('webpack');
var path = require('path')

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve('./dist/'),
        filename: 'qdb.bundle.js'
    },
    cache: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                options: {
                    typeCheck: true
                },
                enforce: 'pre'
            },
            {
                test: /\.jsx?$/,
                loader: 'source-map-loader',
                enforce: 'pre'
            }
        ],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin([]),
        // new webpack.optimize.DedupePlugin()
    ]
}
