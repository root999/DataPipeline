const publishMessage = async (pubSubClient, topicName, data) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));

    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    return messageId;
}
module.exports = { publishMessage }