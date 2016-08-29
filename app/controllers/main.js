'use strict';

const Boom = require('boom');
const Controller = require('hapi-routing/controller');
const DeckManager = require('lib/deck-manager');

const manager = new DeckManager();

module.exports = class MainController extends Controller {
  start() {
    const token = manager.createDeck();
    this.reply(token);
  }

  deal() {
    const token = this.request.params.id;
    try {
      const deck = manager.getDeck(token);
      this.reply(deck.deal());
    } catch (e) {
      throw Boom.wrap(e, 404);
    }
  }
};
