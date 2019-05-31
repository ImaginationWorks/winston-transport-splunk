import _ from 'lodash';
import { Logger, utils } from 'splunk-logging';


/* eslint-disable */
const createLogger = (options) => {
  const logger = new Logger(options);

  // override eventFormatter and _makeBody to support additional fields.
  logger.eventFormatter = function(context) {
    const event = {
      message: context.message,
      severity: context.severity
    };
    _.merge(event, context.fields);
    return event;
  };
  logger._makeBody = function(context) {
    if (!context) {
      throw new Error('Logging: Context parameter is required for Splunk.');
    }

    const body = this._initializeMetadata(context);
    const time = utils.formatTime(body.time || Date.now());
    body.time = time.toString();

    body.event = this.eventFormatter(context);
    return body;
  };

  return logger;
};


export { createLogger };
