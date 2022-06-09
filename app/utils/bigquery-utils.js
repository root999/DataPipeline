const { BigQuery } = require('@google-cloud/bigquery');
const { BaseError } = require('./error-handling/BaseError');
const bigquery = new BigQuery();
const queryBQ = async (query) => {
    const options = {
        query: query,
        useLegacySql: false
    };
    let job;
    try {
        job = (await bigquery.createQueryJob(options))[0]
        console.log(`Job ${job.id} started`)
        var status = (await job.getMetadata())[0]
        if (status.errors && status.errors.length > 0){
            throw errors
        }
        var results = (await job.getQueryResults())[0]
        return results
   }
    catch (err) {
        throw new BaseError(err.message,'queryBQ',false);
    }
}

module.exports = { queryBQ }
