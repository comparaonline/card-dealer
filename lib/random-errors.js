'use strict';

const Boom = require('boom');

class RandomErrors {
  constructor() {
    this.count = 0;
    this.failCount = 0;
    this.error = () => Boom.create(500, 'Random failure!');
  }

  failEvery(count) {
    this.count = 0;
    this.failCount = count;
  }

  mightFail() {
    if (this.failCount > 0) {
      this.count += 1;
      if (this.count >= this.failCount) {
        this.count = 0;
        throw this.error();
      }
    }
  }
}

const randomErrors = new RandomErrors();

module.exports = {
  every: times => randomErrors.failEvery(times),
  never: () => randomErrors.failEvery(0),
  mightFail: () => randomErrors.mightFail()
};
