import logger from "./Singleton.js";

export function logSecondImplementation() {
  logger.log("Second implementation");
  logger.printLogCount();
}
