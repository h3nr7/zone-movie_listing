const webpack = require('webpack');
const middleware = require('webpack-hot-middleware');
const config = require('../../../config/webpack.dev');
const compiler = webpack(config);

module.exports = middleware(compiler);
