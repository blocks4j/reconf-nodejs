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

        it('When it\'s a word spaced', () => {
            expect('bla bla bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced that ends with a number', () => {
            expect('bla bla bla 1'.toPascalCase()).toEqual('BlaBlaBla1');
        });

        it('When it\'s a word spaced by dashes', () => {
            expect('bla-bla-bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by dashes that ends with a number', () => {
            expect('bla-bla-bla-1'.toPascalCase()).toEqual('BlaBlaBla1');
        });

        it('When it\'s a word spaced by dots', () => {
            expect('bla.bla.bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by dots that ends with a number', () => {
            expect('bla.bla.bla.1'.toPascalCase()).toEqual('BlaBlaBla1');
        });

        it('When it\'s a word spaced by underscores', () => {
            expect('bla_bla_bla'.toPascalCase()).toEqual('BlaBlaBla');
        });

        it('When it\'s a word spaced by underscores that ends with a number', () => {
            expect('bla_bla_bla_1'.toPascalCase()).toEqual('BlaBlaBla1');
        });
    });
});