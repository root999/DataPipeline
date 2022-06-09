const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const errorHandler = require('./utils/error-handling/errorHandler')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json())
app.use('/api', require('./pipeline/pipeline-router'))
app.use('/api', require('./metrics/metrics-router'))
app.use(errorMiddleware)

process.on('uncaughtException', async (error) => {
  await errorHandler.handleError(error);
  if (errorHandler.isRequireRestart(error)) process.exit(1);
});

process.on('unhandledRejection',async  (reason) => {
  await errorHandler.handleError(reason)
  throw reason;
});

async function errorMiddleware(err, req, res, next) {
  await errorHandler.handleError(err)
  if (errorHandler.isRequireRestart(err)) {
    process.exit(1)
  }
}
module.exports = app