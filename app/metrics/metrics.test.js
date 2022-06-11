/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');
const config = require('../config');

describe('BigQuery Daily Metrics', () => {
  test('should responses with daily metrics', async () => {
    const res = await request(app)
      .get('/api/metrics')
      .auth('Authorization', `Bearer ${config.authToken.token}`)
      .send();
    expect(200);
  });
});
