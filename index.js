'use strict';
require('./initialization');
const config = require('config');
const Server = require('lib/server');
const randomErrors = require('lib/random-errors');

const server = new Server(8080);
randomErrors.every(config.failEvery);
server
  .start()
  .then(uri => console.log(`Listening on ${uri}`));
