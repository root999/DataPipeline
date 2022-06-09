
const { queryBQ } = require('../utils/bigquery-utils')
var config = require('../config')
var tableName = config.bigquery.tableName
const { BaseError } = require('../utils/error-handling/BaseError')
module.exports = {
    getMetrics: async (req, res, next) => {
        const today = new Date().toISOString().substring(0, 10) // today's date as YYYY-MM-DD
        try {
            let query_daily_active_user_count = `SELECT COUNT(DISTINCT user_id) as active_user_count 
                                    FROM \`${tableName}\` 
                                    WHERE DATE(event_time) = "${today}"`
            //Aynı query'nin başka bir versiyonu.

            // let query_daily_active_user_count = `SELECT COUNT(*) as daily_active_user_count FROM 
            //                                             (SELECT COUNT(*) 
            //                                             FROM \`codeway-352522.codeway.codeay-partitioned\` 
            //                                             WHERE DATE(event_time) = "${today}" GROUP BY user_id )`
            
            let query_daily_active_session = `SELECT AVG(timediff) as daily_average_session
                                            FROM 
                                            (SELECT time_diff(TIME(MAX(event_time)),TIME(MIN(event_time)),MINUTE) as timediff 
                                                FROM \`${tableName}\` 
                                                WHERE DATE(event_time) = "${today}" 
                                                GROUP BY session_id)`
            let query_total_user_count = `SELECT COUNT(*) as total_users
                                            FROM (SELECT COUNT(*) 
                                                    FROM \`${tableName}\`  
                                                    GROUP BY user_id )`

            //let query_daily_new_user_count = Doldurulacak

            var result;
            /*
            Querylerin sonuçları aşağıdaki gibi dönmekte. dolayısıyla total_user bilgisine
            values[0][0].total_user şeklinde ulaşıyoruz
            [
                [ { total_user: 4 } ],
                [ { daily_average_session: 320 } ],
                [ { active_user_count: 3 } ]
            ]
            */
            await Promise.all([queryBQ(query_total_user_count), queryBQ(query_daily_active_session), queryBQ(query_daily_active_user_count)]).then(values => {
                console.log(values)
                result = {
                    result: 'Success',
                    total_users: values[0][0].total_user,
                    daily_stats: [
                        {
                            date: today,
                            average_session_duration: values[1][0].daily_average_session,
                            active_user_count: values[2][0].active_user_count
                        }
                    ]
                };
            }).catch(error => {
                throw error
            })
            res.send(result)
        }
        //testlerde buradaki hatayı yakalayamadım.
        //TO-DO: Çözüm bul
        catch (err) {
            res.status(500).send("Error when trying to connect with BigQuery");
            next(err);
        }
    },
};
