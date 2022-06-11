const { BaseError } = require('./error-handling/BaseError');

const logger = require('./logger');

const queryBQ = async (bigQueryClient, query) => {
  const options = {
    query,
    useLegacySql: false,
  };
  let job;
  try {
    job = (await bigQueryClient.createQueryJob(options))[0];
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
