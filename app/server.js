const app = require('./index');
const config = require('./config');

const logger = require('./utils/logger');

require('dotenv').config();

app.listen(config.express.port, config.express.ip, (error) => {
  if (error) {
    process.exit(10);
  }
  logger.info(`the app is listening on ${config.express.port} `);
});
