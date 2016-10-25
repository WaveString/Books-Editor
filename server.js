const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
const config = require('./config/config.json');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Express
const app = express();
const server = app.listen(config.port, () => {
    console.log(`listening on *: ${config.port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/build`));

if (__DEVELOPMENT__) {
    const webpack = require('webpack');
    const config = require('./webpack.config.dev');
    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/markup', (req, res) => res.sendFile(`${__dirname}/build/index2.html`));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/build/index.html`));
