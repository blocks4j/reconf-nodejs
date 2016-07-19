/*
 *   Copyright 2013-2015 Blocks4J Team (www.blocks4j.org)
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
 *   @copyright     Copyright 2013-2015 Blocks4J Team (www.blocks4j.org)
 *   @link          http://www.blocks4j.org
 *   @since         1.0.0
 *   @license       http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
 */

'use strict';

require('./pascalcase');

const Request = require('./request');
const ReConf = require('./reconf');
const url = require('url');
const os = require('os');

module.exports = settings => {
    settings.properties.forEach(property => {
        let src = url.format({
              host     : settings.host
            , protocol : settings.protocol || 'http'
            , pathname : settings.product +'/'+ settings.component +'/'+ property
            , search   : 'instance=' + (settings.instance || os.hostname())
        });

        let methodName = `get${property.toPascalCase()}`;
        ReConf.set(methodName, () => { return Request(src); });
    });

    return ReConf.getInstance();
};