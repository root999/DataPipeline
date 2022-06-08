const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const errorHandler = require('./utils/error-handling/errorHandler')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json())
app.use('/api',require('./pipeline/pipeline-router'))
app.use('/api',require('./metrics/metrics-router'))
app.use(errorMiddleware)

async function errorMiddleware(err,req,res,next){
  errorHandler.handleError(err)
}
module.exports = app