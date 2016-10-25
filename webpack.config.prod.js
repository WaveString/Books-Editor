const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

baseConfig.entry = ['./src/index'];

baseConfig.output = {
    path: `${__dirname}/build`,
    filename: '[hash].bundle.js',
    publicPath: '/'
};

baseConfig.plugins = baseConfig.plugins.concat([
    new ExtractTextPlugin('[hash].bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } })
]);

baseConfig.devtool = '#source-map';

module.exports = baseConfig;