<p align="center">
    <img src="https://raw.githubusercontent.com/blocks4j/reconf-jvm/master/other/images/reconf.png" />
</p>

[![Build Status](https://travis-ci.org/juliogc/reconf-nodejs.svg?branch=master)](https://travis-ci.org/juliogc/reconf-nodejs) [![Dependencies](https://david-dm.org/juliogc/reconf-nodejs.svg)](https://david-dm.org/juliogc/reconf-nodejs.svg)

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
let {setup} = require('reconf-nodejs')

// setup
setup({
    protocol: 'https', // default is "http"
    host: 'config-reader.reconf.url',
    product: {
        'product': {
            'component': {
                'property': 'Initial Value' // Can be "undefined"
            }
        },
        'other-product': {
            'dot.separated.component': {
                'property': String,
                'dot.separated.property': String,
                'dash-separated-property': String
            }
        }
    },
    applicationUser: 'reconfUserApplication'
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
Type: `Object`</br>
Default: `undefined`

The procudct name registered on ReConf client to represent your whole product.

#### component
Type: `Object`</br>
Default: `undefined`

The component name registered on ReConf client in product area to represent your application.

#### property
Type: `Any value convertible as JSON`</br>
Default: `undefined`


### Usage
After setup, all configured properties will be available in `reconf()` module following the object notation pattern and will respond as `Promise` letting you deal with success and errors on your applications.

### Getting properties

#### Simple names
Property name: `product / component / property`</br>
Getter method: `reconf('product.component.property')`

#### Dashed names
Property name: `some-product / some-component / some-property`</br>
Getter method: `reconf('some-product.some-component.some-property')`</br>
Getter method: `reconf('some-product[some-component][some-property]')`

#### Doted name
Property name: `some.product / some.component / some.property`</br>
Getter method: `reconf('some-product[some-component][some-property]')`

### Setting properties

#### Saving strings
Property name: `product / component / property`</br>
Setter method: `reconf('product.component.property', 'Hello world!')`

#### Saving numbers
Property name: `product / component / property`</br>
Setter method: `reconf('product.component.property', 42)`

#### Saving objects
Property name: `product / component / property`</br>
Setter method: `reconf('product.component.property', { foo : 'bar' })`

#### Simple usage
```javascript
let reconf = require('reconf-nodejs');

reconf('product.component.property')
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

let {setup} = require('reconf-nodejs');

setup({
    protocol: 'https', // default is "http"
    host: 'config-reader.reconf.url',
    product: {
        'product': {
            'component': {
                'property': 'Initial Value' // Can be "undefined"
            }
        }
    },
    applicationUser: 'reconfUserApplication'
});
```

```javascript
// file_that_use_props.js

let reconf = require('reconf-nodejs');

reconf('product.component.property').then(propValue => console.log(propValue));
```

# License

Copyright 2013-2016 Blocks4J Team (www.blocks4j.org)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
