const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

baseConfig.watch = true;

baseConfig.entry = ['react-hot-loader/patch', './src/index'];

baseConfig.output = {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
    publicPath: '/'
};

baseConfig.plugins = baseConfig.plugins.concat([
    new ExtractTextPlugin('bundle.css'),
    new webpack.HotModuleReplacementPlugin()
]);

baseConfig.devtool = '#cheap-source-map';

module.exports = baseConfig;