'use strict';

const webpack = require('webpack');

module.exports = {
    context: __dirname + '/client',
    entry: {
        app: './index.js',
    },
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader?removeTags=true'
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader!import-glob-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.react.js', '.js', '.jsx'],
        modulesDirectories: ['client', 'node_modules']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js'],
    },
    // devServer: {
    //     contentBase: __dirname + '/build'
    // },
};
