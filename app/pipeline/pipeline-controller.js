require('dotenv').config()

const { publishMessage } = require('../utils/pubsub-utils')
const { PubSub } = require('@google-cloud/pubsub')
const pubSubClient = new PubSub()
const topicName = process.env.PUBSUB_TOPIC

module.exports = {
    sendEvents: async (req, res) => {
        let event = req.body;
        let messageId = await publishMessage(pubSubClient, topicName, event);
        return res.status(200).json({
            success: true,
            message: `Message ${messageId} published :)`
        })
    },
};
