const {BaseError} = require('./error-handling/BaseError')
const publishMessage = async (pubSubClient, topicName, data) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try{
        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
        return messageId;
    }
    catch(err){
        throw new BaseError(err.details,"publishMessage",isOperational=false)
    }
   
}


module.exports = { publishMessage }