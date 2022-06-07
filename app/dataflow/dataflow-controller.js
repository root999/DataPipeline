require('dotenv').config()

const { publishMessage } = require('../utils/pubsub-utils')
const { PubSub } = require('@google-cloud/pubsub')
const pubSubClient = new PubSub()
const topicName = process.env.PUBSUB_TOPIC

module.exports = {
    eventsToBQ: async (req, res) => {
        try {
            let messageResponse = await listenForPushMessages(req.body.message.data);
            return res.status(200).json({
                success: true,
                message: "Message received successfully :)",
                data: messageResponse
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Couldn't receive orders object :(",
                data: error
            })
        }
    }
};
