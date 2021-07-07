import { startCase } from '../source/string/startCase';

describe('startCase', () => {
    test('startCase("--foo-bar--") => "Foo Bar"', () => {
        expect(startCase('--foo-bar--')).toBe('Foo Bar');
    });

    test('startCase("fooBar") => "Foo Bar"', () => {
        expect(startCase('fooBar')).toBe('Foo Bar');
    });

    test('startCase("__FOO_BAR__") => "FOO BAR"', () => {
        expect(startCase('__FOO_BAR__')).toBe('FOO BAR');
    });
});
