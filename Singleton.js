// without singleton pattern
// export default class FancyLogger {
//   constructor() {
//     this.logs = [];
//   }
//   log(message) {
//     this.logs.push(message);
//   }
//   printLogCount() {
//     console.log(`${this.logs.length} Logs`);
//   }
// }

// with singleton pattern
class FancyLogger {
  constructor() {
    if (!FancyLogger?.instance) {
      this.logs = [];
      FancyLogger.instance = this;
    }
    return FancyLogger.instance;
  }
  log(message) {
    this.logs.push(message);
  }
  printLogCount() {
    console.log(`${this.logs.length} Logs`);
  }
}

const logger = new FancyLogger();

Object.freeze(logger);

export default logger;
