const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.json())
app.use('/api', require('./pipeline/router'))

module.exports = app