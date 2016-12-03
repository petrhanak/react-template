const path = require('path');
const config = require('config');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const _ = require('lodash');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const client = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: 'node_modules',
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
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: 'node_modules',
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules'
        })
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        exclude: 'node_modules',
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style-[hash].css'),
    new ManifestPlugin()
  ],
  devtool: 'source-map',
  entry: path.resolve(__dirname, '..', 'src', 'client', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, '..', 'build', 'dist'),
    filename: 'main-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  }
};

const server = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: 'node_modules',
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
              ]
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        exclude: 'node_modules',
        loader: 'pug-loader'
      },
      {
        test: /\.css$/,
        exclude: 'node_modules',
        loader: 'css-loader/locals?modules'
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        exclude: 'node_modules',
        loader: 'url-loader?limit=10000&emitFile=false'
      }
    ]
  },
  target: 'node',
  entry: path.resolve(__dirname, '..', 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  }
};

module.exports = [
  client,
  server
];
