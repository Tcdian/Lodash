import { upperCase } from '../source/string/upperCase';

describe('upperCase', () => {
    test('upperCase("--foo-bar") => "FOO BAR"', () => {
        expect(upperCase('--foo-bar')).toBe('FOO BAR');
    });

    test('upperCase("fooBar") => "FOO BAR"', () => {
        expect(upperCase('fooBar')).toBe('FOO BAR');
    });

    test('upperCase("__foo_bar__") => "FOO BAR"', () => {
        expect(upperCase('__foo_bar__')).toBe('FOO BAR');
    });
});
