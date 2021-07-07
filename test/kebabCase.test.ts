import { kebabCase } from '../source/string/kebabCase';

describe('kebabCase', () => {
    test('kebabCase("Foo Bar") => "foo-bar"', () => {
        expect(kebabCase('Foo Bar')).toBe('foo-bar');
    });

    test('kebabCase("fooBar") => "foo-bar"', () => {
        expect(kebabCase('fooBar')).toBe('foo-bar');
    });

    test('kebabCase("__FOO_BAR__") => "foo-bar"', () => {
        expect(kebabCase('__FOO_BAR__')).toBe('foo-bar');
    });
});
