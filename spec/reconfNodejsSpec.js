'use strict';

const nock = require('nock');
let reconf = require('../lib/reconf-nodejs');

describe('reconf-nodejs Spec', function () {
    beforeEach(function () {
        nock('http://config-reader.reconf.url')
            .get('/product-name/product-component/db.pass?instance=server.name')
            .reply(200, 'prop1');

        nock('http://config-reader.reconf.url')
            .get('/product-name/product-component/db.url?instance=server.name')
            .reply(200, 'prop2');

        nock('http://config-reader.reconf.url')
            .get('/product-name/product-component/db.user?instance=server.name')
            .reply(200, 'prop3');

        reconf = reconf({
              host       : 'config-reader.reconf.url'
            , protocol   : 'http'
            , product    : 'product-name'
            , component  : 'product-component'
            , properties : [
                  'db.pass'
                , 'db.url'
                , 'db.user'
            ]
            , instance   : 'server.name'
        });
    });

    afterAll(function () {
        delete reconf.constructor.prototype.getDbPass;
        delete reconf.constructor.prototype.getDbUrl;
        delete reconf.constructor.prototype.getDbUser;
    });

    describe('Should add properties methods', function () {
        it('When reconf is initiated with a proper settings object', function (done) {
            Promise.all([
                  reconf.getDbPass()
                , reconf.getDbUrl()
                , reconf.getDbUser()
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