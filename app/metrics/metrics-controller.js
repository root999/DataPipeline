const { queryBQ } = require('../utils/bigquery-utils');

const config = require('../config');

const { tableName } = config.bigquery;

module.exports = {
  getMetrics: async (req, res, next) => {
    const today = new Date().toISOString().substring(0, 10); //  today's date as YYYY-MM-DD
    try {
      const queryDailyActiveUserCount = `SELECT COUNT(DISTINCT user_id) as active_user_count 
                                    FROM \`${tableName}\` 
                                    WHERE DATE(event_time) = "${today}"`;

      const queryDailyActiveSession = `SELECT AVG(timediff) as daily_average_session
                                            FROM 
                                            (SELECT time_diff(TIME(MAX(event_time)),TIME(MIN(event_time)),MINUTE) as timediff 
                                                FROM \`${tableName}\` 
                                                WHERE DATE(event_time) = "${today}" 
                                                GROUP BY session_id)`;

      const queryTotalUserCount = `SELECT COUNT(*) as total_users
                                            FROM (SELECT COUNT(*) 
                                                    FROM \`${tableName}\`  
                                                    GROUP BY user_id )`;

      const queryDailyNewUserCount = `SELECT COUNT(t1.user_id) as daily_new_user FROM \`codeway-352522.codeway.codeay-partitioned\` as t1 
                                                LEFT JOIN (SELECT user_id FROM \`codeway-352522.codeway.codeay-partitioned\` 
                                                            WHERE DATE(event_time)<current_date('UTC+3') GROUP BY user_id) as t2 
                                                            ON t1.user_id =t2.user_id  WHERE t2.user_id is null`;
      let result;
      /*
      Querylerin sonuçları aşağıdaki gibi dönmekte. dolayısıyla total_user bilgisine
      values[0][0].total_user şeklinde ulaşıyoruz
      [
          [ { total_user: 4 } ],
          [ { daily_average_session: 320 } ],
          [ { active_user_count: 3 } ],
          [ { daily_new_user: 1 } ]
      ]
      */
      await Promise.all([queryBQ(queryTotalUserCount), queryBQ(queryDailyActiveSession),
        queryBQ(queryDailyActiveUserCount), queryBQ(queryDailyNewUserCount)])
        .then((values) => {
          result = {
            result: 'Success',
            total_users: values[0][0].total_user,
            daily_stats: [
              {
                date: today,
                average_session_duration: values[1][0].daily_average_session,
                active_user_count: values[2][0].active_user_count,
                new_user_count: values[3][0].daily_new_user,
              },
            ],
          };
        }).catch((error) => {
          throw error;
        });
      res.send(result);
    // eslint-disable-next-line brace-style
    }
    //  testlerde buradaki hatayı yakalayamadım.
    //  TO-DO: Çözüm bul
    catch (err) {
      res.status(500).send('Error when trying to connect with BigQuery');
      next(err);
    }
  },
};
