const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "react",
                ["latest", {
                  "es2015": {
                    "modules": false
                  }
                }],
                "stage-0"
              ],
              plugins: [
                "typecheck"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules'
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style-[hash].css'),
    new ManifestPlugin()
  ],
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '..', 'src', 'client', 'index.jsx')
  ],
  target: "web",
  output: {
    path: path.resolve(__dirname, '..', 'build', 'dist'),
    filename: 'main-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  }
};