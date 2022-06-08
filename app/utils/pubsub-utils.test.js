const request = require('supertest')
const app = require('../index')
require('dotenv').config()
process.env.PUBSUB_TOPIC = "test"
var payload = {
    "type": "son test",
    "session_id": "9FDA74C2-AB57-4840-87D0-64324772B5A2", "event_name": "click",
    "event_time": 1589623711,
    "page": "main",
    "country": "TR",
    "region": "Marmara",
    "city": "Istanbul",
    "user_id": "Uu1qJzlfrxYxOS5z1kfAbmSA5pF2"
}
describe('PubSub publish message', () => {
    test('responses with message published', async () => {
       const res = await request(app).post('/api/sendEvents')
        .set('Content-Type', 'application/json')
        .send(payload)
        .expect(200)
    })
    test('return error when user sends empty body',async () =>{
        const res = await request(app).post('/api/sendEvents')
        .set('Content-Type', 'application/json')
        .send()
        .expect(500)
    })
})
