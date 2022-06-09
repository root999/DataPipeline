
const { BigQuery } = require('@google-cloud/bigquery');
const {queryBQ} = require('./bigquery-utils')
const bigquery = new BigQuery();
const query = "test"
jest.setTimeout(10000)
describe('Should throws', () => {
    test('return error when BigQuery has errors',async () =>{
        await expect(queryBQ(query)).rejects.toThrow('Resource not found')
    })
})