'use strict';

module.exports = table => table
  .post('/deck', 'main#start')
  .get('/deck/{id}/deal/{count?}', 'main#deal')
;
