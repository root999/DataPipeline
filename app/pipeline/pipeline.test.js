/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');
const config = require('../config');

const payload = {
  type: 'son test',
  session_id: '9FDA74C2-AB57-4840-87D0-64324772B5A2',
  event_name: 'click',
  event_time: 1589623711,
  page: 'main',
  country: 'TR',
  region: 'Marmara',
  city: 'Istanbul',
  user_id: 'Uu1qJzlfrxYxOS5z1kfAbmSA5pF2',
};

describe('PubSub publish message', () => {
  test('responses with message published', async () => {
    const res = await request(app).post('/api/sendEvents')
      .set('Content-Type', 'application/json')
      .auth(config.authToken.token, { type: 'bearer' })
      .send(payload);
    const messageId = res.body.message.split(' ')[1];
    expect(200);
    expect(res.body.message).toEqual(`Message ${messageId} published.`);
  });
  test('return error when user sends empty body', async () => {
    const res = await request(app).post('/api/sendEvents')
      .set('Content-Type', 'application/json')
      .auth(config.authToken.token, { type: 'bearer' })
      .send();
    expect(500);
    expect(res.error.text).toEqual('Request body empty!');
  });
});
