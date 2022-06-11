const { BigQuery } = require('@google-cloud/bigquery');
const { queryBQ } = require('./bigquery-utils');
const config = require('../config');

const createQueries = () => {
  const statsDays = [];
  const queries = [];
  const { tableName } = config.bigquery;
  const bigQueryClient = new BigQuery();
  // statDays dizisi kullanıcının girdiği son X gün için ilgili queryleri hazırlıyoruz.
  for (let i = 0; i < 3; i += 1) {
    const date = new Date(); //  today's date as YYYY-MM-DD
    date.setDate(date.getDate() - i);
    statsDays.push(date.toLocaleDateString('tr-TR'));
  }
  const queryTotalUserCount = `SELECT COUNT(*) as total_users
  FROM (SELECT COUNT(*) 
          FROM \`${tableName}\`  
          GROUP BY user_id )`;

  queries.push(queryBQ(bigQueryClient, queryTotalUserCount));

  for (let i = 0; i < statsDays.length; i += 1) {
    const queryDailyActiveUserCount = `SELECT COUNT(DISTINCT user_id) as active_user_count 
    FROM \`${tableName}\` 
    WHERE DATE(event_time) = current_date('UTC+3')-${i}`;

    const queryDailyActiveSession = `SELECT AVG(timediff) as daily_average_session
            FROM 
            (SELECT time_diff(TIME(MAX(event_time)),TIME(MIN(event_time)),MINUTE) as timediff 
                FROM \`${tableName}\` 
                WHERE DATE(event_time) = current_date('UTC+3')-${i}
                GROUP BY session_id)`;

    const queryDailyNewUserCount = `SELECT COUNT (DISTINCT t1.user_id) as daily_new_user FROM \`${tableName}\` as t1 
                LEFT JOIN (SELECT user_id FROM \`${tableName}\` 
                            WHERE DATE(event_time)<(current_date('UTC+3')-${i})GROUP BY user_id) as t2 
                            ON t1.user_id =t2.user_id WHERE t2.user_id is null and Date(t1.event_time) =(current_date('UTC+3')-${i})`;
    queries.push(
      queryBQ(bigQueryClient, queryDailyActiveUserCount),
      queryBQ(bigQueryClient, queryDailyActiveSession),
      queryBQ(bigQueryClient, queryDailyNewUserCount),
    );
  }
  return [queries, statsDays];
};
module.exports = { createQueries };
