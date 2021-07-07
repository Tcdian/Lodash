import { camelCase } from '../source/string/camelCase';

describe('camelCase', () => {
    test('camelCase("Foo Bar") => "fooBar"', () => {
        expect(camelCase('Foo Bar')).toBe('fooBar');
    });

    test('camelCase("--foo-bar--") => "fooBar"', () => {
        expect(camelCase('--foo-bar--')).toBe('fooBar');
    });

    test('camelCase("__FOO_BAR__") => "fooBar"', () => {
        expect(camelCase('__FOO_BAR__')).toBe('fooBar');
    });
});
