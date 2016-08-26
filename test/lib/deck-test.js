'use strict';

const Deck = require('lib/deck');

describe('Deck', () => {
  it('should be shoufled', () => {
    const deck = new Deck();
    const comp = (a, b) => a.toString().localeCompare(b.toString());
    const sort = (a, b) => comp(a.number, b.number) || comp(a.suit, b.suit);
    expect(deck.cards).to.not.deep.eq(Deck.cards);
    expect(deck.cards.sort(sort)).to.deep.eq(Deck.cards.sort(sort));
  });

  it('should deal the whole deck, never repeating a card', () => {
    const dealt = new Set();
    const deck = new Deck();
    for (let i = 0; i < 52; i++) {
      const card = deck.deal();
      if (dealt.has(card)) {
        fail(`Card ${card} was already dealt!`);
      }
      dealt.add(card);
    }
  });

  it('should throw an exception when the deck is dealt completely', () => {
    const deck = new Deck();
    for (let i = 0; i < 52; i++) { deck.deal(); }
    expect(() => deck.deal()).to.throw(/Out of cards/);
  });
});
