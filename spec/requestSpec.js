'use strict';

const nock = require('nock');
const Request = require('../lib/request');

describe('Request', () => {
    beforeEach(() => {
        nock.cleanAll();

        nock('http://test.server')
            .get('/spec')
            .reply(200, 'passed');
    });

    describe('Shouldn\'t make a http request', () => {
        it('When Request module is called with no arguments', (done) => {
            Request().catch(err => {
                expect(err.message).toBe('Request URL must be valid');
                done();
            });
        });

        it('When Request module is called with a non string argument', (done) => {
            Request(/[^a]String/).catch(err => {
                expect(err.message).toBe('Request URL must be valid');
                done();
            });
        });

        it('When Request module is called with a empty string', (done) => {
            Request('').catch(err => {
                expect(err.message).toBe('Request URL must be valid');
                done();
            });
        });

        it('When Request module is called with a string that seens like URL', (done) => {
            Request('http://lorem ipsum dolor').catch(err => {
                expect(err.message).toBe('Request URL must be valid');
                done();
            });
        });

        it('When Request module is called with a string that doesn\'t represent a URL', (done) => {
            Request('lorem ipsum dolor').catch(err => {
                expect(err.message).toBe('Request URL must be valid');
                done();
            });
        });

        it('When server responds with a error', function (done) {
            nock.cleanAll();

            let error = nock('http://test.server')
                .get('/spec')
                .replyWithError(503 , 'because fuck you, that\'s why');

            Request('http://test.server/spec').catch(err => {
                expect(err.message).toBe('503');
                done();
            });
        });
    });

    describe('Should make a http request', () => {
        it('When Request module is called correctly', (done) => {
            Request('http://test.server/spec').then(data => {
                expect(data).toBe('passed');
                done();
            });
        });
    });
});