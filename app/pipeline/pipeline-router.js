const router = require('express').Router();
const pipelineController = require('./pipeline-controller');

router.post('/sendEvents', pipelineController.sendEvents);

module.exports = router;
