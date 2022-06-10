const { BaseError } = require('./BaseError');
const logger = require('../logger');

class ErrorHandler {
  // eslint-disable-next-line class-methods-use-this
  async handleError(err) {
    logger.error(err);
  }
  //  Hata bizim özellikle fırlattığımız ve operasyonel bir hata ise
  //  sistemi kapatmamıza gerek yok. Hatayı yutup devam ediyoruz.
  //  Aksi durumda sistemi restart etmemiz gerekiyor.

  // eslint-disable-next-line class-methods-use-this
  isRequireRestart(error) {
    if (!(error instanceof BaseError && error.isOperational)) {
      return true;
    }
    return false;
  }
}

module.exports = new ErrorHandler();
