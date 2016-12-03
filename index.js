const config = require('config');
const express = require('express');

const port = process.env.PORT || config.port;

const server = express();

if (config.dev) {
  server.use(require('./rebuildMiddleware'));
} else {
  server.use(express.static('./build/dist'));
  server.use(require('./build/app').default());
}

server.listen(port);
