
const { Router } = require('express');
const pipelineController = require('./pipeline-controller');
var router = require('express').Router()

router.post('/sendEvents',pipelineController.sendEvents);

module.exports = router