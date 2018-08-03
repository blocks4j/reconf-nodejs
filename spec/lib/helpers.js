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

module.exports.mockRequest = (scope, {method, uri, responseBody}) => {
    return scope[method](uri)
        .query({ application : /.*/ })
        .reply(applicationValidator(responseBody));
}

let applicationValidator = responseBody => uri => {
    let statusCode = 200;

    if (!responseBody) {
        statusCode = 204;
    }

    if (uri.split('?')[1].split('=')[1] !== 'blocks4j' || uri.match('blocked')) {
        statusCode = 403;
        responseBody = {
            message: 'Aplicacao nao autorizada',
            code: 'application.denied',
            status: statusCode
        };
    }

    return [statusCode, responseBody];
};