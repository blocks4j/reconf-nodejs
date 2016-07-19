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
 *   @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *   @link          http://www.blocks4j.org
 *   @since         1.0.0
 *   @license       http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0
 */

'use strict';

const Promise = require('bluebird');
const http = require('http');

/**
 *   @module Request
 *   Module structure to deal with http requests
 *   as promises
 *
 *   @param {String} url
 *   @return Promise
 */
const Request = (url) => {
    return new Promise((resolve, reject) => {
        let isValidUrl = typeof url === 'string' && url.length;

        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        if (!isValidUrl) {
            return reject(new TypeError('Request URL must be valid'));
        }

        if (!urlPattern.test(url)) {
            return reject(new TypeError('Request HTTP protocol must be valid'));
        }

        /**
         *   @variable {String} protocol
         *   Gets URL protocol to require correct
         *   http(s) lib
         */
        const protocol = url.match(/^http(?:s)?/)[0];

        /**
         *   @constant {Native Module} lib
         *   Required http(s) lib by URL protocol
         */
        const lib = require(protocol);


        /**
         *   @variable {String} body
         *   Represents response body
         */
        let body = '';

        /**
         *   @constant {Request} request
         *   Represents request http(s) process
         */
        const request = lib.request(url, response => {

            response.on('data', chunk => body += chunk );

            response.on('end', () => resolve(body) );
        });

        request.on('error', reject);

        request.end();
    });
};

module.exports = Request;