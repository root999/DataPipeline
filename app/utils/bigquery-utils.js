const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
require('dotenv').config()
const insertRowsAsStream = async(row) => {
    const datasetId = 'codeway';
    const tableId = 'events';
    await bigquery.dataset(datasetId).table(tableId).insert(row);
}

module.exports = {insertRowsAsStream}
