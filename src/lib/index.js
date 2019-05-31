/*
 * splunk.js: Transport for winston logging to Splunk event API
 *
 * (C) 2019 Sean Xiong @ ImagintionWorks Pty Ltd
 * MIT LICENCE
 *
 */
import _ from 'lodash';
import os from 'os';
import util from 'util';
import Transport from 'winston-transport';
import winston from 'winston';
import { createLogger } from './splunk-logger';


const Splunk = function (options) {
  if (!options) {
    throw new Error('Splunk options is required');
  } else if (!options.url) {
    throw new Error('Splunk url is required.');
  } else if (!options.index) {
    throw new Error('Splunk index is required.');
  } else if (!options.token) {
    throw new Error('Splunk token is required.');
  }
  Transport.call(this, options);

  this.options = options;
  this.name = 'splunk';
  this.logger = createLogger(options);
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Splunk, Transport);

//
// Define a getter so that `winston.transports.Splunk`
// is available and thus backwards compatible.
//
winston.transports.Splunk = Splunk;

//
// Expose the name of this Transport on the prototype
//
Splunk.prototype.name = 'splunk';

const formSystemMetadata = opts => ({
  time: new Date().getTime(),
  source: opts.source,
  sourcetype: opts.sourcetype || 'api_json',
  index: opts.index || '',
  host: opts.host || os.hostname()
});

//
// ### function log (level, message, meta, callback)
// #### @level {string} Level at which to log the message.
// #### @message {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//
Splunk.prototype.log = function (level, message, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }
  const metadata = meta;

  const fields = metadata.fields;

  const self = this;
  const systemMeta = formSystemMetadata(self.options);
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
};


export { Splunk };
