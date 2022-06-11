const { createQueries } = require('../utils/create-queries');

module.exports = {
  getMetrics: async (req, res, next) => {
    try {
      let result;
      const [queries, statDays] = createQueries();
      /*
      Querylerin sonuçları aşağıdaki gibi dönmekte. dolayısıyla total_user bilgisine
      values[0][0].total_user şeklinde ulaşıyoruz
      // Aşağıdaki sorgu örneği 12 Haziran tarihinde son 3 günün verilerini göstermekte
      [
        [ { total_users: 8 } ],       12 Haziran itibariyle toplam kullanıcı sayısı
        [ { active_user_count: 0 } ], 12 Haziran günü aktif kullanıcı sayısı
        [ { daily_average_session: null } ],  12 Haziran günü ortalama session süresi (dakika)
        [ { daily_new_user: 0 } ],  12 Haziran günü yeni kullanıcı sayısı
        [ { active_user_count: 1 } ], 11 Haziran günü aktif kullanıcı sayısı
        [ { daily_average_session: 0 } ], 11 Haziran günü ortalama session süresi
        [ { daily_new_user: 1 } ],  11 Haziran günü yeni kullanıcı sayısı
        [ { active_user_count: 1 } ], 10 Haziran günü aktif kullanıcı sayısı
        [ { daily_average_session: 0 } ], 10 Haziran günü ortalama session süresi
        [ { daily_new_user: 1 } ] 10 Haziran günü yeni kullanıcı sayısı
      ]
      */
      await Promise.all(queries)
        .then((values) => {
          const dailyStats = [];
          // values[0][0] total kullanıcı sayısı olduğu için response'de günlük
          // veriler içerisinde bulunmayacak. Bu sebeple i =1 olarak başlanıyor
          // Ayrıca her 3 eleman 1 günün verisi olduğu için for döngüsü
          // (yapılan sorgu sayısı-1) kere dönmeli -Total Count bir kere çağırıldığı için-
          // her bir döngüde 3 elemanı birden okuduğumuz için i +=3 olarak ilerliyor.
          for (let i = 1; i <= (values.length - 1); i += 3) {
            const dailyStatTemp = {
              date: statDays[Math.floor(i / 3)],
              active_user_count: values[i][0].active_user_count,
              average_session_duration: values[i + 1][0].daily_average_session,
              new_user_count: values[i + 2][0].daily_new_user,
            };
            dailyStats.push(dailyStatTemp);
          }
          result = {
            result: 'Success',
            total_users: values[0][0].total_user,
            daily_stats: dailyStats,
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
