const pino = require('pino');
const config = require('../config');
// Pino ile hem konsola hem dosyaya log basılıyor.
const streams = [
  { stream: process.stdout },
  { stream: pino.destination(config.logPath.path) },
];
const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 10,
};

module.exports = require('pino')(
  {
    level: 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => ({ level: label }),
    },
  },
  pino.multistream(streams),
);
