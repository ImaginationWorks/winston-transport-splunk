/*
 * splunk.js: Transport for winston logging to Splunk event API
 *
 * (C) 2019 ImaginationWorks Pty Ltd
 * MIT LICENCE
 *
 */
const _ = require('lodash');
const Transport = require('winston-transport');
const winston = require('winston');
const { createLogger } = require('./logger');


module.exports = class Splunk extends Transport {
  constructor(options) {
    if (!options) {
      throw new Error('Splunk options is required');
    } else if (!options.url) {
      throw new Error('Splunk url is required.');
    } else if (!options.index) {
      throw new Error('Splunk index is required.');
    } else if (!options.token) {
      throw new Error('Splunk token is required.');
    }

    super(options);
    this.name = 'splunk';
    Transport.call(this, options);
    this.options = options;
    this.logger = createLogger(options);
  }

  log(info, callback) {
    if (this.silent) {
      return callback(null, true);
    }

    const { level, message, timestamp } = info;
    const metadata = Object.assign({}, _.omit(info, ['level', 'message']));

    const fields = metadata.fields;

    const self = this;
    const systemMeta = {
      time: timestamp || new Date().getTime(),
      source: self.options.source,
      sourcetype: self.options.sourcetype,
      index: self.options.index,
      host: self.options.host
    };
    _.merge(metadata, systemMeta);
    delete metadata.message;
    delete metadata.fields;

    const payload = {
      message,
      metadata,
      severity: level,
      fields
    };

    this.logger.send(payload, (err) => {
      if (err) {
        console.error('Logging: Failed to send event to Splunk', err);
      }
      self.emit('Logging: logged to Splunk');
    });
    return callback(null, true);
  }
};

winston.transports.Splunk = module.exports;
