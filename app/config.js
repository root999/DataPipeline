var config = module.exports
require('dotenv').config()
var PRODUCTION = process.env.NODE_ENV === 'production'
config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '127.0.0.1'
}
/* 
pubsub için authentication bilgilerini burada setleyebilirim.
Eğer filePath PubSub() constructor'u içerisine verilmiyorsa env variable arasında GOOGLE_APPLICATION_CREDENTIALS aranıyor.
ilgili auth.json dosyası kullanılarak erişim sağlanıyor. 
*/
config.pubsub = {
  
}

if (PRODUCTION) {
  config.express.ip = '0.0.0.0'
}