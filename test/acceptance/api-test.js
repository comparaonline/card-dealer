'use strict';

const request = require('request');
const Server = require('lib/server');
const Deck = require('lib/deck');

describe('Dealer API', () => {
  const server = new Server();
  let uri;
  beforeEach(() => server.start().then(assigned => { uri = assigned; }));
  afterEach(() => server.stop());

  it('should return a new token when calling POST /deck', done => {
    request.post(`${uri}/deck`, (error, response, body) => {
      expect(error).to.be.null;
      expect(response.statusCode).to.eq(200);
      expect(body.length).to.eq(36);
      done();
    });
  });

  it('should deal cards when using an existent deck', done => {
    request.post(`${uri}/deck`, (error, _, token) => {
      expect(error).to.be.null;
      request.get(`${uri}/deck/${token}/deal`, (error2, response, body) => {
        expect(error2).to.be.null;
        expect(response.statusCode).to.eq(200);
        const card = JSON.parse(body);
        const id = c => `${c.number}${c.suit}`;
        expect(id(card)).to.be.oneOf(Deck.cards.map(id));
        done();
      });
    });
  });

  it('should allow specifying the amount of cards to deal', done => {
    const CARD_COUNT = 10;
    request.post(`${uri}/deck`, (error, _, token) => {
      expect(error).to.be.null;
      request.get(`${uri}/deck/${token}/deal/${CARD_COUNT}`,
        (error2, response, body) => {
          expect(error2).to.be.null;
          expect(response.statusCode).to.eq(200);
          const cards = JSON.parse(body);
          const id = c => `${c.number}${c.suit}`;
          expect(cards.length).to.eq(CARD_COUNT);
          cards.forEach(card => expect(id(card)).to.be.oneOf(Deck.cards.map(id)));
          done();
        });
    });
  });
  it('should fail on an invalid deal count', done => {
    const CARD_COUNT = -10;
    request.post(`${uri}/deck`, (error, _, token) => {
      expect(error).to.be.null;
      request.get(`${uri}/deck/${token}/deal/${CARD_COUNT}`,
        (error2, response, body) => {
          expect(error2).to.be.null;
          expect(response.statusCode).to.eq(400);
          expect(body).to.match(/positive number/);
          done();
        });
    });
  });

  it('should throw 404 when accessing a non-existent deck', done => {
    const INVALID = '123456789012345678901234567890123456';
    request.get(`${uri}/deck/${INVALID}/deal`, (error, response, body) => {
      expect(error).to.be.null;
      expect(response.statusCode).to.eq(404);
      const result = JSON.parse(body);
      expect(result.message).to.match(/Wrong token/);
      done();
    });
  });
});
