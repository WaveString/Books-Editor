const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';
const config = __DEVELOPMENT__ ?
    require('./webpack.config.dev.js') :
    require('./webpack.config.prod.js');

module.exports = [config];
