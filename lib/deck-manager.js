'use strict';

const uuid = require('uuid');
const Deck = require('./deck');

const FIVE_MINUTES = 300000;

module.exports = class DeckManager {
  constructor() {
    this.decks = {};
  }

  static get timeout() {
    return FIVE_MINUTES;
  }

  createDeck() {
    const token = uuid.v1();
    this.decks[token] = new Deck();
    setTimeout(() => { delete this.decks[token]; }, DeckManager.timeout);
    return token;
  }

  getDeck(token) {
    if (this.decks[token] === undefined) {
      throw new Error('Wrong token!');
    }
    return this.decks[token];
  }
};
