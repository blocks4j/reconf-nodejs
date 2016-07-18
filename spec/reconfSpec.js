'use strict';

describe('ReConf Spec', function () {
    let ReConf = require('../lib/reconf');

    describe('Should returns a ReConf instance', function () {
        it('When called getInstance method', function () {
            let reconfInstace = ReConf.getInstance();

            expect(reconfInstace).toEqual(jasmine.any(ReConf));
        });
    });

    describe('Shouldn\'t set a new method/property', function () {
        it('When "set" method it\'s called with no arguments', function () {
            ReConf.set();

            expect(Object.keys(ReConf.prototype).length).toBe(0);
        });

        it('When "set" method it\'s called with a non string as name argument', function () {
            ReConf.set(/[^a]String/, () => {});

            expect(Object.keys(ReConf.prototype).length).toBe(0);
        });

        it('When "set" method it\'s called with a empty string as name argument', function () {
            ReConf.set('', () => {});

            expect(Object.keys(ReConf.prototype).length).toBe(0);
        });
    });

    describe('Should set a new method/property', function () {
        let testMehotd, testProperty;

        beforeEach(function () {
            testMehotd = () => {};
            testProperty = ['arrayprop'];
        });

        it('When "set" method it\'s correctly whith a method', function () {
            ReConf.set('testMehotd', testMehotd);

            expect(ReConf.prototype.testMehotd).toEqual(testMehotd);
        });

        it('When "set" method it\'s correctly whith a property', function () {
            ReConf.set('testProperty', testProperty);

            expect(ReConf.prototype.testProperty).toEqual(testProperty);
        });
    });
});