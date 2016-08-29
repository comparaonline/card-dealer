'use strict';

const config = require('config');
const path = require('path');
const Hapi = require('hapi');
const hapiRouting = require('hapi-routing');
const routes = require('app/routes');

module.exports = class Server {
  constructor(port) {
    this.controllers = path.join(__dirname, '../app/controllers');
    this.server = this.createServer(port);
  }

  start() {
    return this.server
      .tap(server => server.start())
      .then(server => server.info.uri);
  }

  stop() {
    return this.server.tap(server => server.stop());
  }

  createServer() {
    const server = new Hapi.Server(config.hapi.configuration);
    server.connection(config.hapi.connection);
    return server
      .register(hapiRouting(routes, this.controllers))
      .then(() => server);
  }
};
