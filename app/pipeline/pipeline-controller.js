require('dotenv').config()

const { publishMessage } = require('../utils/pubsub-utils')
const { PubSub } = require('@google-cloud/pubsub')
const pubSubClient = new PubSub()
const topicName = process.env.PUBSUB_TOPIC
const { BaseError } = require('../utils/error-handling/BaseError')
module.exports = {
    sendEvents: async (req, res,next) => {
        try{
            if (Object.keys(req.body).length === 0) {
                throw new BaseError('POST method body is empty!');
            }
            let event = req.body;
            let messageId = await publishMessage(pubSubClient, topicName, event);
            return res.status(200).json({
                success: true,
                message: `Message ${messageId} published :)`
            })
        }
        catch(err){
            res.status(500).send("Error in the server");
            console.log("catch");
            next(err);
        }
    },
};
