'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/index.js'),
  ],
  output: {
    publicPath: '/static/js',
    path: path.join(__dirname, '/server/static/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader?removeTags=true',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader!import-glob-loader',
      },
      {
        test: /\.modernizrrc$/,
        loader: "modernizr",
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx'],
    modulesDirectories: ['client', 'node_modules'],
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc'),
    },
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js'],
  },
};
