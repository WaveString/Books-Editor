const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            template: './src/html/index2.html',
            inject: false
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: /src/
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract('style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]!postcss'),
                include: /src/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|eot)$/,
                loader: 'url?name=[name].[ext]&limit=8192',
                include: /src/
            }
        ]
    },
    postcss() {
        return [
            autoprefixer({ browsers: ['last 2 versions'] })
        ];
    }
};