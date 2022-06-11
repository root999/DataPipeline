const { BigQuery } = require('@google-cloud/bigquery');
const { BaseError } = require('./error-handling/BaseError');

const logger = require('./logger');

const bigquery = new BigQuery();
const queryBQ = async (query) => {
  const options = {
    query,
    useLegacySql: false,
  };
  let job;
  try {
    job = (await bigquery.createQueryJob(options))[0];
    logger.info(`Job ${job.id} started`);
    const status = (await job.getMetadata())[0];
    if (status.errors && status.errors.length > 0) {
      throw status.errors;
    }
    const results = (await job.getQueryResults())[0];
    return results;
  } catch (err) {
    throw new BaseError(err.message, 'queryBQ', false);
  }
};

module.exports = { queryBQ };
