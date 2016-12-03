const path = require('path');
const webpack = require('webpack');
const express = require('express');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const clientConfig = require('./webpack/dev.client.config.js');
const serverConfig = require('./webpack/dev.server.config.js');

const server = express();
const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

let buildInstances = 0;

function startBuild() {
  if (buildInstances === 0) {
    console.log('webpack building...')
  }
  buildInstances++;
}

function endBuild(stats) {
  buildInstances--;
  if (stats.compilation.errors && stats.compilation.errors.length) {
    console.log(stats.compilation.errors[0].message);
  } else if (buildInstances === 0) {
    console.log('build done')
  }
}

serverCompiler.plugin("compile", startBuild);
clientCompiler.plugin("compile", startBuild);

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  noInfo: true,
  quiet: true,
  reporter: function reporter(options) {
    const stats = options.stats;
    endBuild(stats);
  }
});
const hotMiddleware = webpackHotMiddleware(clientCompiler, {log: false});

server.use(devMiddleware);
server.use(hotMiddleware);

const buildFile = path.resolve(serverConfig.output.path, serverConfig.output.filename);

const serverBuild = new Promise(resolve => {
  serverCompiler.watch({}, function onBuild(err, stats) {
    endBuild(stats);
    delete require.cache[buildFile];
    resolve()
  });
});

server.use(function (req, res, next) {
  serverBuild
    .then(() => {
      require('./build/app').default(devMiddleware.fileSystem)(req, res, next);
    })
    .catch(err => {
      console.error(err.stack)
    });
});

module.exports = server;