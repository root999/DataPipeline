
var app = require('./index')
var config = require('./config')
app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    process.exit(10)
  }
  console.log(`its listeninf ${config.express.port}`)
})