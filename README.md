<p align="center">
    <img src="https://raw.githubusercontent.com/blocks4j/reconf-jvm/master/other/images/reconf.png" />
</p>

# ReConf NodeJS #

## Installation ##
```bash
$ npm install --save reconf-nodejs
```

## Basic Usage ##
```javascript
let reconf = require('reconf-nodejs');

let settings = {
      host       : 'config-reader.reconf.url'
    , protocol   : 'https'
    , product    : 'product-name'
    , component  : 'component-name'
    , properties : [
          'prop.name.1'
        , 'prop.name.2'
        , 'prop.name.3'
    ]
};

reconf = reconf(settings);
```