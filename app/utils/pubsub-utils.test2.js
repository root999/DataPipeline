const { publishMessage } = require('./pubsub-utils')
const { PubSub } = require('@google-cloud/pubsub')
const topicName = "test"
const pubSubClient = new PubSub()
// jest.setTimeout(10000)
// describe('Should throws', () => {
//     test('return error when Pubsub Client has errors',async () =>{
//         await expect(publishMessage(pubSubClient,topicName,topicName)).rejects.toThrow('Resource not found')
//     })
// })