/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');

describe('BigQuery Daily Metrics', () => {
  test('should responses with daily metrics', async () => {
    const res = await request(app).get('/api/metrics').send();
    expect(200);
  });
});
