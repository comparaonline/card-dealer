'use strict';

const DeckManager = require('lib/deck-manager');
const Deck = require('lib/deck');

describe('Deck manager', () => {
  it('should return a token when creating a deck', () => {
    const manager = new DeckManager();
    const token = manager.createDeck();
    expect(token.length).to.eq(36);
  });

  it('should allow accessing a deck using an existent token', () => {
    const manager = new DeckManager();
    const token = manager.createDeck();
    const deck = manager.getDeck(token);
    expect(deck).to.be.an.instanceOf(Deck);
  });

  it('should fail for non-existent tokens', () => {
    const manager = new DeckManager();
    expect(() => manager.getDeck('test-token')).to.throw(/Wrong token/);
  });

  it('should expire decks after the timeout', () => {
    fakeTime((done, clock) => {
      const manager = new DeckManager();
      const token = manager.createDeck();
      clock.tick(DeckManager.timeout);
      expect(() => manager.getDeck(token)).to.throw(/Wrong token/);
      done();
    });
  });

  it('should refresh a deck\'s timeout on access', () => {
    fakeTime((done, clock) => {
      const manager = new DeckManager();
      const token = manager.createDeck();
      clock.tick(DeckManager.timeout - 1);
      expect(() => manager.getDeck(token)).to.not.throw(/Wrong token/);
      clock.tick(1);
      expect(() => manager.getDeck(token)).to.not.throw(/Wrong token/);
      clock.tick(DeckManager.timeout);
      expect(() => manager.getDeck(token)).to.throw(/Wrong token/);
      done();
    });
  });
});
