const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index',
  ],
  output: {
    publicPath: '/dist/',
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader',
    }, {
      test: /\.styl$/,
      loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!stylus',
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};
