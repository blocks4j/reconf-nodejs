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

const nock = require('nock');
const reconf = require('../lib/reconf-nodejs');
const {mockRequest} = require('./lib/helpers');

describe('[reconf-nodejs Spec]', () => {
    let ConfigReader, user, config;

    beforeEach(() => {
        ConfigReader = nock('http://config-reader.reconf.url'),
        user = 'blocks4j';

        config = {
            protocol: 'http',
            host: 'config-reader.reconf.url',
            product: {
                'some-product': {
                    'dot.separated.component': {
                        'property': String,
                        'dot.separated.property': String,
                        'dash-separated-property': String
                    }
                },
                'blocked-product': {
                    'componentA': {
                        'one.more.property': String
                    }
                }
            },
            applicationUser: user
        };

        mockRequest(ConfigReader, {
            method: 'get',
            uri: `/product/some-product/component/dot.separated.component/property/property`,
            responseBody: {
                name: 'dot.separated.property',
                description: 'Lorem ipsum dolor sit amet',
                value: 'property',
            }
        });

        mockRequest(ConfigReader, {
            method: 'put',
            uri: `/product/some-product/component/dot.separated.component/property/property`
        });

        mockRequest(ConfigReader, {
            method: 'get',
            uri: `/product/some-product/component/dot.separated.component/property/dot.separated.property`,
            responseBody: {
                name: 'dot.separated.property',
                description: 'Lorem ipsum dolor sit amet',
                value: 'prop1'
            }
        });

        mockRequest(ConfigReader, {
            method: 'put',
            uri: `/product/some-product/component/dot.separated.component/property/dot.separated.property`
        });

        mockRequest(ConfigReader, {
            method: 'get',
            uri: `/product/some-product/component/dot.separated.component/property/dash-separated-property`,
            responseBody: {
                name: 'dot.separated.property',
                description: 'Lorem ipsum dolor sit amet 22222',
                value: 'prop2'
            }
        });

        mockRequest(ConfigReader, {
            method: 'put',
            uri: `/product/some-product/component/dot.separated.component/property/dash-separated-property`
        });

        mockRequest(ConfigReader, {
            method: 'get',
            uri: `/product/blocked-product/component/componentA/property/one.more.property`,
            responseBody: {
                name: 'dot.separated.property',
                description: 'Lorem ipsum dolor sit amet 22222',
                value: '{ "foo" : "bar" }'
            }
        });

        mockRequest(ConfigReader, {
            method: 'put',
            uri: `/product/blocked-product/component/componentA/property/one.more.property`
        });
    });

    describe('Should throw a Error and stop the process', () => {
        describe('When reconf is initiated', () => {
            it('Without a "host" setting', () => {
                delete config.host;
                expect(() => reconf.setup(config))
                    .toThrow(new Error('[ReConf] Missing or malformed configuration'));
            });

            it('With a invalid "host" setting', () => {
                config.host = /[^array]/g;
                expect(() => reconf.setup(config))
                    .toThrow(new Error('[ReConf] Missing or malformed configuration'));
            });

            it('Without a "product" setting', () => {
                delete config.product;
                expect(() => reconf.setup(config))
                    .toThrow(new Error('[ReConf] Missing or malformed configuration'));
            });

            it('With a invalid "product" setting', () => {
                config.product = /[^array]/g;
                expect(() => reconf.setup(config))
                    .toThrow(new Error('[ReConf] Missing or malformed configuration'));
            });

            it('Without a "applicationUser" setting', () => {
                delete config.applicationUser;
                expect(() => reconf.setup(config))
                    .toThrow(new Error('[ReConf] Missing or malformed configuration'));
            });

            it('With a invalid "applicationUser" setting', () => {
                config.applicationUser = /[^array]/g;
                expect(() => reconf.setup(config))
                    .toThrow(new Error('[ReConf] Missing or malformed configuration'));
            });
        });
    });

    describe('When reconf is initiated with a proper settings object', () => {
        beforeEach(() => {
            reconf.setup(config);
        });

        describe('Should return a response from server', () => {
            it('When a "property" is requested', async done => {
                let property = (await reconf('some-product[dot.separated.component].property')).value;
                expect(property).toBe('property');
                done();
            });

            it('When a "dot.separated.property" is requested', async done => {
                let prop1 = (await reconf('some-product[dot.separated.component][dot.separated.property]')).value;
                expect(prop1).toBe('prop1');
                done();
            });

            it('When a "dash-separated-property" is requested', async done => {
                let prop2 = (await reconf('some-product[dot.separated.component].dash-separated-property')).value;
                expect(prop2).toBe('prop2');
                done();
            });

            it('When many properties are requested', async done => {
                let requests = [
                        reconf('some-product[dot.separated.component][property]'),
                        reconf('some-product[dot.separated.component][dot.separated.property]'),
                        reconf('some-product[dot.separated.component][dash-separated-property]')
                    ],
                    responses = await Promise.all(requests),
                    values = responses.map(({value}) => value);

                expect(responses.length).toEqual(requests.length);
                expect(values[0]).toBe('property');
                expect(values[1]).toBe('prop1');
                expect(values[2]).toBe('prop2');

                done();
            });

            it('When a non authorized application user is used to request', async done => {
                config.applicationUser = 'br34kth47us3r';
                reconf.setup(config);

                let {status, code} = await reconf('some-product[dot.separated.component][property]');
                expect(status).toBe(403);
                expect(code).toBe('application.denied');

                done();
            });

            it('When a non authorized component to a valid application user is requested', async done => {
                let responses = await Promise.all([
                    reconf('some-product[dot.separated.component][property]'),
                    reconf('blocked-product[componentA][one.more.property]')
                ]);

                expect(responses[0].code).toBeUndefined();
                expect(responses[0].status).toBeUndefined();

                expect(responses[1].code).toBe('application.denied');
                expect(responses[1].status).toBe(403);
                expect(responses[1].property).toBe('blocked-product[componentA][one.more.property]');

                done();
            });
        });

        describe('Should save the desired value', () => {
            it('When a string value is passed to a "property"', async done => {
                let response = await reconf('some-product[dot.separated.component][property]', '123');
                expect(response).toBeUndefined();
                done();
            });

            it('When a numeric value is passed to a "property"', async done => {
                let response = await reconf('some-product[dot.separated.component][property]', 123);
                expect(response).toBeUndefined();
                done();
            });

            it('When a object value is passed to a "property"', async done => {
                let response = await reconf('some-product[dot.separated.component][property]', { foo : 'bar' });
                expect(response).toBeUndefined();
                done();
            });

            it('When a array value is passed to a "property"', async done => {
                let response = await reconf('some-product[dot.separated.component][property]', [1, 2, 3]);
                expect(response).toBeUndefined();
                done();
            });
        });
    });
});