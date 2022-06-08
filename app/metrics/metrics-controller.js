require('dotenv').config()

const { queryBQ } = require('../utils/bigquery-utils')

const { BaseError } = require('../utils/error-handling/BaseError')
module.exports = {
    getMetrics: async (req, res,next) => {
        try{
            let query = `SELECT type 
                FROM \`codeway-352522.codeway.events\`
                LIMIT 1`
            var result;
            await Promise.all([queryBQ(query),queryBQ(query)]).then(values =>{
                console.log(values)
                result={
                    result:'Success',
                    query1:values[0],
                    query2:values[1]
                };
            })
            .catch(error =>{
                console.log(error)
            })
            res.send(result)
        }
        catch(err){
            res.status(500).send("Error in the server");
            console.log("catch");
            next(err);
        }
    },
};
