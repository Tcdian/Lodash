import { lowerCase } from '../source/string/lowerCase';

describe('lowerCase', () => {
    test('lowerCase("--Foo-Bar--") => "foo bar"', () => {
        expect(lowerCase('--Foo-Bar--')).toBe('foo bar');
    });

    test('lowerCase("fooBar") => "foo bar"', () => {
        expect(lowerCase('fooBar')).toBe('foo bar');
    });

    test('lowerCase("__FOO_BAR__") => "foo bar"', () => {
        expect(lowerCase('__FOO_BAR__')).toBe('foo bar');
    });
});
