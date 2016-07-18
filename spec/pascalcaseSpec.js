'use strict';

describe('String.prototype.toPascalCase Spec', function () {
    require('../lib/pascalcase');

    describe('Should do nothing', function () {
        it('When it\'s a empty string', function () {
            expect(''.toPascalCase()).toEqual('');
        });
    });

    describe('Should pascal captalize', function () {
        it('When it\'s a non word spaced string', function () {
            expect('blablabla'.toPascalCase()).toEqual('Blablabla');
        });

        it('When it\'s a word spaced string', function () {
            expect('bla bla bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced string', function () {
            expect('bla bla bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by dashes', function () {
            expect('bla-bla-bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by dots', function () {
            expect('bla.bla.bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by underscores', function () {
            expect('bla_bla_bla'.toPascalCase()).toEqual('BlaBlaBla');
        });
    });
});