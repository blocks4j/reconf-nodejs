'use strict';

const ReConf = require('../lib/reconf');

describe('ReConf Spec', () => {
    beforeEach(function () {
        delete ReConf.prototype.testMehotd;
        delete ReConf.prototype.testProperty;
    });

    describe('Should returns a ReConf instance', () => {
        it('When called getInstance method', () => {
            let reconfInstace = ReConf.getInstance();

            expect(reconfInstace).toEqual(jasmine.any(ReConf));
        });
    });

    describe('Shouldn\'t set a new method/property', () => {
        it('When "set" method it\'s called with no arguments', () => {
            ReConf.set();

            expect(Object.keys(ReConf.prototype).length).toBe(0);
        });

        it('When "set" method it\'s called with a non string as name argument', () => {
            ReConf.set(/[^a]String/, () => {});

            expect(Object.keys(ReConf.prototype).length).toBe(0);
        });

        it('When "set" method it\'s called with a empty string as name argument', () => {
            ReConf.set('', () => {});

            expect(Object.keys(ReConf.prototype).length).toBe(0);
        });
    });

    describe('Should set a new method/property', () => {
        let testMehotd, testProperty;

        beforeEach(() => {
            testMehotd = () => {};
            testProperty = ['arrayprop'];
        });

        it('When "set" method it\'s correctly whith a method', () => {
            ReConf.set('testMehotd', testMehotd);

            expect(ReConf.prototype.testMehotd).toEqual(testMehotd);
        });

        it('When "set" method it\'s correctly whith a property', () => {
            ReConf.set('testProperty', testProperty);

            expect(ReConf.prototype.testProperty).toEqual(testProperty);
        });
    });
});