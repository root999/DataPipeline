/* eslint-disable no-undef */
const { queryBQ } = require('./bigquery-utils');

const query = 'test';
jest.setTimeout(10000);
// Test jest'in timeout süresinden daha uzun sürüyor. Bu sebeple fail oluyor.
// TO-DO: Çözüm bul
describe('Should throws', () => {
  test('return error when BigQuery has errors', async () => {
    await expect(queryBQ(query)).rejects.toThrow('Resource not found');
  });
});
