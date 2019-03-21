const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('../../../config/webpack.dev');
const compiler = webpack(config);

module.exports = middleware(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});
