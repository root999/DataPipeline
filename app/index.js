const express = require('express');

const app = express();
// Body-parser request body'sini parse etmek için kullanılmakta
const bodyParser = require('body-parser');

// Authentication için auth0 platformu kullanılıyor
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const helmet = require('helmet');

const errorHandler = require('./utils/error-handling/errorHandler');
const { BaseError } = require('./utils/error-handling/BaseError');

app.use(helmet());

// Auth token middleware

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-2a75vjz3.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://codeway-api',
  issuer: 'https://dev-2a75vjz3.eu.auth0.com/',
  algorithms: ['RS256'],
});

// eslint-disable-next-line no-unused-vars
async function errorMiddleware(err, req, res, next) {
  await errorHandler.handleError(err);
  if (errorHandler.isRequireRestart(err)) {
    process.exit(1);
  }
}
app.use(jwtCheck);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use('/api', require('./pipeline/pipeline-router'));

app.use('/api', require('./metrics/metrics-router'));

// Handling authentication error.
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
    throw new BaseError(err.inner.message, 'authentication', true);
  } else {
    next(err);
  }
});

app.use(errorMiddleware);

process.on('uncaughtException', async (error) => {
  await errorHandler.handleError(error);
  if (errorHandler.isRequireRestart(error)) process.exit(1);
});

process.on('unhandledRejection', async (reason) => {
  await errorHandler.handleError(reason);
  throw reason;
});

module.exports = app;
