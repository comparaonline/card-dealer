'use strict';

module.exports = table => table
  .post('/dealer/deck', 'main#start')
  .get('/dealer/deck/{id}/deal/{count?}', 'main#deal')
  .get('/dealer/health_check', 'main#healthcheck');
