const { BigQuery } = require('@google-cloud/bigquery');

const bigQueryUtils = require('./bigquery-utils');

jest.mock('@google-cloud/bigquery');
describe('Big Query function', () => {
  describe('Should throws an error ', () => {
    test('returns error when BigQuery Client has error', async () => {
      const bigQueryClient = new BigQuery();
      const mockQueryBQ = jest.spyOn(bigQueryUtils, 'queryBQ');
      const query = 'SELECT * FROM table';
      mockQueryBQ.mockImplementation((bigQueryClient, query) => {
        throw new Error('Resource not found');
      });
      expect(() => mockQueryBQ(bigQueryClient, query)).toThrowError('Resource not found');
      expect(BigQuery).toHaveBeenCalledTimes(1);
      mockQueryBQ.mockReset();
    });
  });
})
