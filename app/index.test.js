const request = require('supertest');
const app = require('./index');
const config = require('./config');
describe('Should throws an error ', () => {
  test('when user tries to connect without permission', async () => {
    const res = await request(app)
      .get('/')
      .send();
    expect(401);
    expect(res.error.text).toEqual('invalid token...');
  });
  test('returns Error when authenticated user attempts to use invalid enpoint ', async () => {
    const res = await request(app)
      .get('/s')
      .auth(config.authToken.token, { type: 'bearer' })
      .send();
    expect(404);
  });
});

