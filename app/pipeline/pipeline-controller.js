const { PubSub } = require('@google-cloud/pubsub');
const config = require('../config');
const { publishMessage } = require('../utils/pubsub-utils');

const { BaseError } = require('../utils/error-handling/BaseError');

const pubSubClient = new PubSub();
const topicName = config.pubsub.pubsub_topic;
module.exports = {
  // eslint-disable-next-line consistent-return
  sendEvents: async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new BaseError('POST method body is empty!', 'sendEvents', true);
      }
      const event = req.body;
      const messageId = await publishMessage(pubSubClient, topicName, event);
      return res.status(200).json({
        success: true,
        message: `Message ${messageId} published.`,
      });
    } catch (err) {
      if (err.isOperational) {
        res.status(500).send('Request body empty!');
      } else {
        res.status(500).send('Error when trying to connect with PUBSUB topic');
      }
      next(err);
    }
  },
};
