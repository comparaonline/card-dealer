'use strict';

const request = require('request');
const Server = require('lib/server');
const randomErrors = require('lib/random-errors');

describe('Server Random errors', () => {
  const server = new Server();
  let uri;
  beforeEach(() => server.start().then(assigned => { uri = assigned; }));
  afterEach(() => server.stop());
  beforeEach(() => randomErrors.every(2));
  afterEach(() => randomErrors.never());

  it('should return a new token when calling POST /deck', done => {
    request.post(`${uri}/dealer/deck`, (error, response, body) => {
      expect(error).to.be.null;
      expect(response.statusCode).to.eq(200);
      expect(body.length).to.eq(36);
      request.post(`${uri}/dealer/deck`, (error2, response2) => {
        expect(error2).to.be.null;
        expect(response2.statusCode).to.eq(500);
        request.post(`${uri}/dealer/deck`, (error3, response3, body3) => {
          expect(error3).to.be.null;
          expect(response3.statusCode).to.eq(200);
          expect(body3.length).to.eq(36);
          done();
        });
      });
    });
  });
});
