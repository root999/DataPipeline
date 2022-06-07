const express = require('express')
const app = express()
const port = 3001
const { listenForPushMessages } = require('./utils/pubsub-utils')
const {insertRowsAsStream} = require('./utils/bigquery-utils')
require('dotenv').config()
const jsonBodyParser = express.json();

const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

app.get('/', (req, res) => {
  res.send("tetst");
});
var messageCount = 0
app.post('/', jsonBodyParser, async (req, res) => {
    try {
        console.log("test2")
        let messageResponse = await listenForPushMessages(req.body.message.data);
        insertRowsAsStream(messageResponse)
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
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log('Press Ctrl+C to quit.');
  });
