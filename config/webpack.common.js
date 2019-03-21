const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../static');
const APP_DIR = path.resolve(__dirname, '../');
require('dotenv/config');

const webpackConfig = {
  entry: {
    main: [
      "babel-polyfill",
      APP_DIR + '/client/src/index.js'
    ],
    // vendor: []
  },
  output: {
    path: BUILD_DIR,
    filename: 'assets/js/[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.test\.js$/,
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              extends: APP_DIR + '/config/.babelrc'
            }
          },
          {
            loader: "eslint-loader",
            options: {
              failOnError: true,
              configFile: APP_DIR + '/config/.eslintrc.json',
              ignorePath: APP_DIR + '/config/.eslintignore',
              outputReport: {
                filePath: 'build_logs/eslint-build-report.[hash].xml',
                formatter: require('eslint/lib/formatters/checkstyle')
              }
            }
          }
        ]
      },
      {
        test: /\.(?:sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }, {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: APP_DIR + '/config/postcss.config.js' }
            }
          }, {
            loader: "resolve-url-loader",
            options: { sourceMap: true }
          }, {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts/',
          }
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]'
        }
      },
      {
        test: /\.(ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },

    ]
  },
  plugins: [
    // ignore locale in moments to reduce package size
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'assets/stylesheets/app.bundle.[contenthash].css',
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      API_PROTOCOL: JSON.stringify(process.env.API_PROTOCOL),
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
      API_VER: JSON.stringify(process.env.API_VER),
      API_KEY: JSON.stringify(process.env.API_KEY),
      PORT: JSON.stringify(process.env.PORT)
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  node: {
   fs: "empty"
  }
};

module.exports = webpackConfig;
