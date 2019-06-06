# winston-transport-splunk

A [Splunk][0] transport for [winston][1].

## Usage
``` js
    import winston from 'winston';
    import { Splunk } from 'winston-transport-splunk';
    
    
    cconst createTransports = (options) => {
        const transports = [];
        
        //
        // Create console and other transports
        //
        
        transports.push(new Splunk(options.splunk));
        return transports;
    };
     
    const options = {  
        console:{  
            level:'debug'
        },
        splunk:{  
            url: YOUR_SPLUNK_URL,
            index: YOUR_SPLUNK_INDEX,
            token: YOUR_SPLUNK_TOKEN,
            host: YOUR_SPLUNK_HOST,
            source: YOUR_SPLUNK_SOURCE,
            sourcetype:'api_json',
            maxRetries:0,
            level:'debug'
        }
    }
         
    const createLogger = options => winston.createLogger({
        levels: winston.config.npm.levels,
        format: winston.format.simple(),
        transports: createTransports(options)
    });
```

The Splunk transport is based on [splunk-logging][2], and used [winston-elasticsearch][3] as a reference.

### configuration options

- *source*: The value used for the "source" metadata passed to Splunk.
- *sourcetype*: The value used for the "sourcetype" metadata passed to Splunk.
- *batchInterval*: The number of milliseconds to wait before flushing logs.
- *maxBatchCount*: The number of logs to batch before flushing.
- *maxBatchSize*: The size of the batch, in bytes, to accumulate before flushing.
- *maxRetries*: The number of times the transport should retry sending failed batches.
- *url*: The url used to connect to the Splunk. *This is required*
- *index*: The Splunk index to log to.
- *token*: The token used for connecting to the Splunk. *This is required*

This module uses splunk-logging to send events to Splunk, more details of configuration options can be found at [splunk-logging][2]. 

## Installation

### Installing winston-transport-splunk

``` bash
  $ npm install --save winston-transport-splunk
```

## Run Linting

```
  npm run lint
```

## Run Tests 

Tests will be added soon. 

```
  npm run test
```

#### Author: [Sean Xiong](http://htxiong.com) @ Imaginationworks
#### License: MIT

[0]: http://splunk.com
[1]: https://github.com/flatiron/winston
[2]: https://www.npmjs.com/package/splunk-logging
[3]: https://github.com/vanthome/winston-elasticsearch
