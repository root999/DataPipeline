const { Router } = require('express');
const metricsController = require('./metrics-controller');
var router = require('express').Router()

router.get('/metrics',metricsController.getMetrics);

module.exports = router