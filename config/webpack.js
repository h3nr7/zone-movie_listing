const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const APP_DIR = path.resolve(__dirname, '../');

var config = merge(common, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/client/html/index.html',
      minify: {
        collapseWhitespace: true
      },
      hash: false,
      filename: 'index.html',
      inject: 'body',
      stats: { children: false }
    }),
    new StyleLintPlugin({
      configFile: APP_DIR + '/config/.stylelintrc',
      quiet: true,
      emitErrors: false,
      failOnError: false
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  stats: {
    children: false,
    colors: true,
    reasons: true,
    warnings: false
  }
});

module.exports = config;
