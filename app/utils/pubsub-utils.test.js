const { PubSub } = require('@google-cloud/pubsub');

const pubSubUtils = require('./pubsub-utils');
jest.mock('@google-cloud/pubsub');
let mockPublishMessage = jest.spyOn(pubSubUtils, 'publishMessage');
describe('Should throws an error ', () => {
  test('returns error when Pubsub Client has errors', async () => {
    const pubSubClient = new PubSub();
    const topicName = 'testTopicName';
    const data = 'testdata';
    mockPublishMessage.mockImplementation((pubSubClient,topicName,data)=>{
      throw new Error('Resource not found');
    });
    expect(()=>mockPublishMessage(pubSubClient, topicName, data)).toThrowError('Resource not found');
    expect(PubSub).toHaveBeenCalledTimes(1);
    mockPublishMessage.mockReset();
  });
});
