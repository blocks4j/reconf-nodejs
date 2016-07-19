'use strict';

require('../lib/pascalcase');

describe('String.prototype.toPascalCase Spec', () => {
    describe('Should do nothing', () => {
        it('When it\'s a empty string', () => {
            expect(''.toPascalCase()).toEqual('');
        });
    });

    describe('Should pascal captalize', () => {
        it('When it\'s a non word spaced string', () => {
            expect('blablabla'.toPascalCase()).toEqual('Blablabla');
        });

        it('When it\'s a word spaced string', () => {
            expect('bla bla bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced string', () => {
            expect('bla bla bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by dashes', () => {
            expect('bla-bla-bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by dots', () => {
            expect('bla.bla.bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by underscores', () => {
            expect('bla_bla_bla'.toPascalCase()).toEqual('BlaBlaBla');
        });
    });
});