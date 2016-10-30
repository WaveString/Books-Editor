const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
const config = require('./config/config.json');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/build`));

if (__DEVELOPMENT__) {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.dev');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/markup', (req, res) => res.sendFile(`${__dirname}/build/index2.html`));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.listen(config.port, () => {
    console.log(`listening on *: ${config.port}`);
});
