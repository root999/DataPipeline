
const pino = require('pino')()
class ErrorHandler{
    async handleError(err) {
       if (err.isOperational){
           console.log("test")
       }
       else{
           console.log(err)
       }
        
    }
}
module.exports = new ErrorHandler()