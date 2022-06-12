/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');
const config = require('../config');

jest.setTimeout(30000);
describe('BigQuery Daily Metrics', () => {
  describe('Get daily metrics', () => {
    test('When user calls endpoint, the service should return daily metrics succesfully', async () => {
      const res = await request(app)
        .get('/api/metrics')
        .auth(config.authToken.token, { type: 'bearer' })
        .send();
      expect(200);
    });
  });
});
