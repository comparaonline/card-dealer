'use strict';

const Boom = require('boom');
const Controller = require('hapi-routing/controller');
const DeckManager = require('lib/deck-manager');
const mightFail = require('lib/random-errors').mightFail;

const manager = new DeckManager();

module.exports = class MainController extends Controller {
  start() {
    mightFail();
    const token = manager.createDeck();
    this.reply(token);
  }

  deal() {
    mightFail();
    const token = this.request.params.id;
    const count = this.request.params.count || 1;
    try {
      const deck = manager.getDeck(token);
      this.reply(deck.deal(count));
    } catch (e) {
      throw Boom.wrap(e, 404);
    }
  }
};
