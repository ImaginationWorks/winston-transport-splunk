# winston-splunk

A [Splunk][0] transport for [winston][1].

## Usage
``` js
    import winston from 'winston';
    import { Splunk } from 'winston-splunk';
    
    
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

The Splunk transport is based on [splunk-logging][2]


## Installation

### Installing winston-splunk

``` bash
  $ npm install winston
  $ npm install winston-splunk
```

## Run Linting

```
  npm run lint
```

## Run Tests

```
  npm run test
```

#### Author: [Sean Xiong](http://blog.htxiong.com)
#### License: MIT

[0]: http://splunk.com
[1]: https://github.com/flatiron/winston
[2]: https://www.npmjs.com/package/splunk-logging
