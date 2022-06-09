const { BaseError } = require('./BaseError')

const pino = require('pino')
// Pino ile hem konsola hem dosyaya log basılıyor.
const streams = [
    { stream: process.stdout },
    { stream: pino.destination(`${__dirname}/combined.log`) },
];
const levels = {
    emerg: 80,
    alert: 70,
    crit: 60,
    error: 50,
    warn: 40,
    notice: 30,
    info: 20,
    debug: 10,
};
const logger = pino(
    {
        level:'info',
        customLevels: levels,
        useOnlyCustomLevels: true,
        formatters: {
            level: (label) => {
                return { level: label };
            }
        },
    },

    pino.multistream(streams)
);
class ErrorHandler {
    async handleError(err) {
        logger.error(err)
    }
    // Hata bizim özellikle fırlattığımız ve operasyonel bir hata ise
    //sistemi kapatmamıza gerek yok. Hatayı yutup devam ediyoruz.
    //Aksi durumda sistemi restart etmemiz gerekiyor.
    isRequireRestart(error) {
        if (!(error instanceof BaseError && error.isOperational)) {
            return true
        }
        else {
            return false
        }

    }

}

module.exports = new ErrorHandler()