
import { createLogger } from "../logger.js";
const logger = createLogger('commands:start');

export default function start(config){
  logger.hightlight('starting the app');
  logger.debug('Received configuration',config);
}
