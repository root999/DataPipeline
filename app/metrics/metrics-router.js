const router = require('express').Router();
const metricsController = require('./metrics-controller');

router.get('/metrics', metricsController.getMetrics);

module.exports = router;
