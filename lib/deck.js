'use strict';

const DeckOutOfCards = require('./errors/deck-out-of-cards');

const flatten = arr => [].concat.apply([], arr);
const range = num => Array.from(Array(num).keys());
const shuffle = original => {
  const array = original.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

module.exports = class Deck {
  constructor() {
    this.cards = shuffle(Deck.cards);
  }

  static get cards() {
    this._cards = this._cards || (() => {
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const named = {0: 'A', 10: 'J', 11: 'Q', 12: 'K'};
      const numbers = range(13)
        .map(card => named[card] ? named[card] : (card + 1).toString());
      return flatten(suits.map(suit => numbers.map(number => ({number, suit}))));
    })();
    return this._cards;
  }

  deal(count) {
    count = count || 1;
    if (this.cards.length >= count) {
      return count === 1 ? this.cards.pop() : this.cards.splice(0, count);
    }
    throw new DeckOutOfCards('Out of cards!!');
  }

};
