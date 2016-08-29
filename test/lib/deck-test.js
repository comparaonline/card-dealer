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
    const dealt = [];
    const deck = new Deck();
    for (let i = 0; i < 52; i++) {
      const id = c => `${c.number}${c.suit}`;
      const card = id(deck.deal());
      expect(card).to.not.be.oneOf(dealt);
      dealt.push(card);
    }
  });

  it('should deal as many cards as requested', () => {
    const deck = new Deck();
    const cards = deck.deal(30);
    expect(cards.length).to.eq(30);
  });

  it('should fail when requesting more cards than left on the deck', () => {
    const deck = new Deck();
    expect(() => deck.deal(53)).to.throw(/Out of cards/);
  });

  it('should throw an exception when the deck is dealt completely', () => {
    const deck = new Deck();
    for (let i = 0; i < 52; i++) { deck.deal(); }
    expect(() => deck.deal()).to.throw(/Out of cards/);
  });
});
