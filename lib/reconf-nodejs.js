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

require('./pascalcase');

const url = require('url');
const fetch = require('node-fetch');
// const ReConf = require('./reconf');
// const Request = require('./request');


/**
 *   @function pathMapper
 *   Map configuration reconf properties
 *   into {export} properties
 *
 *   @return undefined
 */
function pathMapper (obj, path, uris) {
    if (typeof obj === 'string') {
        properties[obj] = {
              name: obj
            , value: undefined
            , path: path.concat(uris, obj).join('/')
            , pools: []
            , instances: []
        };

        return properties[obj];
    }

    if (!path) path = [];
    if (!uris) uris = ['product', 'component', 'property'];

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            path = path.concat(uris.splice(0, 1), key);
        }

        pathMapper(obj[key], path, uris);
    }
}


/**
 *   @default ReConf
 *   A instance from ReConf class
 *
 *   @return ReConf
 */
// module.exports = () => {
//     return ReConf.getInstance();
// };
let ReConf = module.exports = () => {
    return {}
};

/**
 *   @constant properties
 *   Map reconf properties to manage requests
 *   and returned values
 */
const properties = module.exports.properties = {};


/**
 *   @method setup
 *   Configures properties settings in
 *   ReConf prototype
 *
 *   @return undefined
 */
let setup = module.exports.setup = settings => {
    pathMapper(settings.product);
    console.log(properties);

    // let proxy = new Proxy(properties, {
    //     get: async (target, prop) => {
    //         console.log(target[prop]);
    //         // let value = await fetch(target.prop);
    //     }
    // });

    // Object.keys(properties).forEach(prop => {
    //     let {path} = properties[prop];

    //     let src = url.format({
    //           protocol : settings.protocol || 'http'
    //         , host     : settings.host
    //         , pathname : path
    //         , search   : `application=${settings.applicationUser}`
    //     });

    //     console.log(src);
    // });
//     settings.properties.forEach(property => {
//         let src = url.format({
//               host     : settings.host
//             , protocol : settings.protocol || 'http'
//             , pathname : settings.product +'/'+ settings.component +'/'+ property
//             , search   : 'instance=' + (settings.instance || os.hostname())
//         });

//         let methodName = `get${property.toPascalCase()}`;
//         ReConf.set(methodName, () => { return Request(src); });
//     });
};