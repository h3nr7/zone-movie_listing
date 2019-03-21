const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const APP_DIR = path.resolve(__dirname, '../');
require('dotenv/config');

var webpackConfig = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/client/html/index.html',
      minify: {
        collapseWhitespace: true
      },
      hash: false,
      filename: 'index.html',
      inject: 'body',
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new StyleLintPlugin({
      configFile: APP_DIR + '/config/.stylelintrc',
      quiet: true,
      emitErrors: false,
      failOnError: false

    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false})
  ],
  stats: {
    children: false,
    colors: true,
    reasons: true,
    warnings: false
  }

});

module.exports = webpackConfig;
