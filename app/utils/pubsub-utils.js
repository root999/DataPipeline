const publishMessage = async (pubSubClient, topicName, data) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));

    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    return messageId;
}
const listenForPushMessages = (payload) => {
    const message = Buffer.from(payload, 'base64').toString(
        'utf-8'
    );
    let parsedMessage = JSON.parse(message);
    return parsedMessage;
}

module.exports = { publishMessage, listenForPushMessages }