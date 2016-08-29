'use strict';
require('./initialization');
const Server = require('lib/server');

const server = new Server(8080);

server
  .start()
  .then(uri => console.log(`Listening on ${uri}`));
