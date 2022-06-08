class BaseError extends Error{
    constructor(message,methodName,isOperational = true){
        super(message)
        if (methodName) this.methodName = methodName
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}
module.exports= {BaseError}