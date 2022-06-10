const app = require('./index');
const config = require('./config');

require('dotenv').config();

app.listen(config.express.port, config.express.ip, (error) => {
  if (error) {
    process.exit(10);
  }
  console.log(`service listening on port ${config.express.port}`);
});
