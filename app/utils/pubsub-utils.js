const { BaseError } = require('./error-handling/BaseError');

const logger = require('./logger');

const publishMessage = async (pubSubClient, topicName, data) => {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  try {
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    logger.info(`Message ${messageId} published.`);
    return messageId;
  } catch (err) {
    throw new BaseError(err.details, 'publishMessage', false);
  }
};
module.exports = { publishMessage };
