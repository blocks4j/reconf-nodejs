/*
*   Copyright 2013-2018 Blocks4J Team (www.blocks4j.org)
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*
*   @copyright     Copyright 2013-2018 Blocks4J Team (www.blocks4j.org)
*   @link          http://www.blocks4j.org
*   @since         1.0.0
*   @license       http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
*/

'use strict';

const is = require('is');
const dotcfg = require('dotcfg');
const request = require('request-promise-native');
const {format} = require('url');

const reconf = dotcfg('reconf');
const uris = ['product', 'component', 'property'];

/**
*   @default ReConf
*   Default method that gets URL from remote.cfg
*   and requests (get/put) it from remote web service
*   to retrieve the desired property
*
*   @return ReConf
*/
const ReConf = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    return request({
        method: (!value) ? 'GET' : 'PUT',
        url: reconf.cfg(key),
        json: (!value) ? true : { value },
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).catch(({error}) => (error.property = key, error));
};


/**
*   @function toBracketNotation
*   Map a stack of values into a javascript
*   object bracket notation string
*
*   @return String
*/
function toBracketNotation (value, index) {
    return (index > 0) ? `[${value}]` : value;
}


/**
*   @function toPath
*   Map a stack of values into a URL path
*   pattern seppareted by slashs (/)
*
*   @return String
*/
function toPath (path) {
    return (item, index) => `${item}/${path[index]}`;
}


/**
*   @function iterate
*   Iterate recursively over a object and map
*   their properties as {objIndex} and {path}
*
*   @return undefined
*/
function iterate(obj, callback, stack = []) {
	for (let property in obj) {
        stack.push(property);
        let item = obj[property];
        if (typeof item !== "object") {
            let objIndex = stack.map(toBracketNotation).join(''),
                path = uris.map(toPath(stack)).join('/');
            reconf.cfg(objIndex, callback(path));
        }

        iterate(item, callback, stack);
        stack.pop();
    }
}


/**
*   @method setup
*   Configures properties settings in
*   ReConf prototype
*
*   @return undefined
*/
let setup = module.exports.setup = ({protocol, host, product, applicationUser}) => {
    if (!is.string(host) || !is.object(product) || !is.string(applicationUser)) {
        throw new Error('[ReConf] Missing or malformed configuration');
    }

    reconf.cfg(product);

    iterate(reconf.cfg(), path => format({
        protocol: protocol || 'http',
        host: host,
        pathname: path,
        search: `application=${applicationUser}`
    }));
};


/**
*   @public
*/
module.exports = ReConf;
module.exports.setup = setup;
