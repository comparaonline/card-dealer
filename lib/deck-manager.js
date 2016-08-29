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
    this.decks[token] = {
      deck: new Deck()
    };
    this.refreshTimeout(token);
    return token;
  }

  refreshTimeout(token) {
    const clear = () => { delete this.decks[token]; };
    if (this.decks[token].timeout) {
      clearTimeout(this.decks[token].timeout);
    }
    this.decks[token].timeout = setTimeout(clear, DeckManager.timeout);
  }

  getDeck(token) {
    if (this.decks[token] === undefined) {
      throw new Error('Wrong token!');
    }
    this.refreshTimeout(token);
    return this.decks[token].deck;
  }
};
