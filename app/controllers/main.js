'use strict';

const Boom = require('boom');
const Joi = require('joi');
const DeckManager = require('lib/deck-manager');
const mightFail = require('lib/random-errors').mightFail;

const manager = new DeckManager();

module.exports = class MainController {
  start(request, reply) {
    mightFail();
    const token = manager.createDeck();
    reply(token);
  }

  static dealValidation() {
    return {
      params: {
        id: Joi.string().length(36),
        count: Joi.number().positive()
      }
    };
  }

  deal(request, reply) {
    mightFail();
    const token = request.params.id;
    const count = request.params.count || 1;
    try {
      const deck = manager.getDeck(token);
      reply(deck.deal(count));
    } catch (e) {
      throw Boom.wrap(e, 404);
    }
  }
};
