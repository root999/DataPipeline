const config = module.exports;

require('dotenv').config();

const PRODUCTION = process.env.NODE_ENV === 'production';
config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '0.0.0.0',
};
config.logPath = {
  path: './app/logs/combined.log',
};
config.authToken = {
  token: process.env.AUTH_TOKEN,
};

/*
pubsub için authentication bilgilerini burada setleyebilirim.
Eğer filePath PubSub() constructor'u içerisine verilmiyorsa
env variable arasında GOOGLE_APPLICATION_CREDENTIALS aranıyor.
ilgili auth.json dosyası kullanılarak erişim sağlanıyor.
*/
config.pubsub = {
  projectName: process.env.GOOGLE_CLOUD_PROJECT,
  pubsub_topic: process.env.PUBSUB_TOPIC,
};
config.bigquery = {
  tableName: process.env.BQ_TABLENAME,
};
config.corruptedQueryForTest = {
  query: 'SELECT * FROM ',
};

if (PRODUCTION) {
  config.express.ip = '0.0.0.0';
}
