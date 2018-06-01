class Log {
  static debug(msg: string, ...extras) {
    console.info(msg, ...extras);
  }

  static info(msg: string, ...extras) {
    console.info(msg, ...extras);
  }

  static warn(msg: string, ...extras) {
    console.warn(msg, ...extras);
  }
  static error(msg: string, ...extras) {
    console.error(msg, ...extras);
  }
}

export default Log;
