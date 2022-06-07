
const dataflowController = require('./dataflow-controller');
var router = require('express').Router()

router.post('/eventToBQ',dataflowController.eventsToBQ);

module.exports = router