<p align="center">
    <img src="https://raw.githubusercontent.com/blocks4j/reconf-jvm/master/other/images/reconf.png" />
</p>

[![Build Status](https://travis-ci.org/blocks4j/reconf-nodejs.svg?branch=master)](https://travis-ci.org/blocks4j/reconf-nodejs) [![Dependency Status](https://david-dm.org/blocks4j/reconf-nodejs.svg)](https://david-dm.org/blocks4j/reconf-nodejs)

# ReConf NodeJS
The ReConf NodeJS Project is a module that provides an easy interface between the ReConf Web Service and any other NodeJS applications that share the same product properties.

For more information about ReConf, read more in [ReConf JVM](https://github.com/blocks4j/reconf-jvm)

## Installation
```bash
$ npm install --save reconf-nodejs
```

## Basic Usage

### Setup
```javascript
let reconf = require('reconf-nodejs')

// setup
reconf.setup({
      host       : 'config-reader.reconf.url'
    , protocol   : 'https'
    , product    : 'product-name'
    , component  : 'component-name'
    , instance   : 'outside.server.name'
    , properties : [
          'prop.name.1'
        , 'prop.name.2'
        , 'prop.name.3'
    ]
});
```

### Options

#### host
Type: `String`</br>
Default: `undefined`

The host origin where your ReConf WS is hosted.

#### protocol
Type: `String`</br>
Default: `http`

If your server has an secure connection you can change the `HTTP` by `HTTPS` requests.

#### product
Type: `String`</br>
Default: `undefined`

The procudct name registered on ReConf client to represent your whole product.

#### component
Type: `String`</br>
Default: `undefined`

The component name registered on ReConf client in product area to represent your application.

#### properties
Type: `Array[String]`</br>
Default: `undefined`

The properties name registered on ReConf client in component area that you'll need to use in yout application.
Obs: The properties can be divided by ` `(sapces), `.`(dots), `-`(dashes) and `_`(underscore)s

#### instance
Type: `String`</br>
Default: `os.hostname()`

If you need to get values from a specif server instance you can change in this option

### Usage
After setup, all configured properties will be available as `getter` as methods in `reconf()` module following the pattern:

Property name: `prop.name.1`</br>
Getter method: `reconf().getPropName1`

All the `getter` methods follow the `Promise` pattern, letting you deal with success and errors on your applications.

#### Simple usage
```javascript
let reconf = require('reconf-nodejs');

reconf()
    .getPropName1()
    .then(propValue => {
        console.log(propValue); // A string value
    })
    .catch(err => {
        console.log(err); // Some error
    });
```

#### Handling with multiple properties
```javascript
let reconf = require('reconf-nodejs');

Promise.all([
      reconf().getPropName1()
    , reconf().getPropName2()
])
.then(propValues => {
    console.log(propValues); // All values in array
})
.catch(err => {
    console.log(err); // Some error
});
```

#### Using with [bluebird](https://www.npmjs.com/package/bluebird)
```javascript
// npm install -S bluebird
let Promise = require('bluebird');
let reconf = require('reconf-nodejs');

Promise.all([
      reconf().getPropName1()
    , reconf().getPropName2()
])
.then(propValues => {
    console.log(propValues); // All values in array
})
.catch(err => {
    console.log(err); // Some error
});
```

#### Using on multiple files
When using on multiple "requires", you'll need setup ReConf just one time. The module will handle how to share the methods by yourself.
```javascript
// config.js

let reconf = require('reconf-nodejs');

reconf.setup({
      host       : 'config-reader.reconf.url'
    , protocol   : 'https'
    , product    : 'product-name'
    , component  : 'component-name'
    , instance   : 'server.name'
    , properties : [
          'prop.name.1'
        , 'prop.name.2'
        , 'prop.name.3'
    ]
});
```

```javascript
// file_that_use_props.js

let reconf = require('reconf-nodejs');

reconf().getPropName1().then(propValue => console.log(propValue));
reconf().getPropName2().then(propValue => console.log(propValue));
reconf().getPropName3().then(propValue => console.log(propValue));
```

# License

Copyright 2013-2016 Blocks4J Team (www.blocks4j.org)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
