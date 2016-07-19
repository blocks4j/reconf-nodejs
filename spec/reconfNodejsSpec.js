'use strict';

const nock = require('nock');
let reconf = require('../lib/reconf-nodejs');

describe('reconf-nodejs Spec', function () {
    beforeEach(function () {
        nock('http://config-reader.reconf.url')
            .get('/product-name/product-component/prop.name.1?instance=server.name')
            .reply(200, 'prop1');

        nock('http://config-reader.reconf.url')
            .get('/product-name/product-component/prop.name.2?instance=server.name')
            .reply(200, 'prop2');

        nock('http://config-reader.reconf.url')
            .get('/product-name/product-component/prop.name.3?instance=server.name')
            .reply(200, 'prop3');

        reconf = reconf({
              host       : 'config-reader.reconf.url'
            , protocol   : 'http'
            , product    : 'product-name'
            , component  : 'product-component'
            , properties : [
                  'prop.name.1'
                , 'prop.name.2'
                , 'prop.name.3'
            ]
            , instance   : 'server.name'
        });
    });

    afterAll(function () {
        delete reconf.constructor.prototype.getPropName1;
        delete reconf.constructor.prototype.getPropName2;
        delete reconf.constructor.prototype.getPropName3;
    });

    describe('Should add properties methods', function () {
        it('When reconf is initiated with a proper settings object', function (done) {
            Promise.all([
                  reconf.getPropName1()
                , reconf.getPropName2()
                , reconf.getPropName3()
            ]).then(values => {
                expect(values.length).toBe(3);
                expect(values[0]).toBe('prop1');
                expect(values[1]).toBe('prop2');
                expect(values[2]).toBe('prop3');
                done();
            });
        });
    });
});