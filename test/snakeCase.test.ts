import { snakeCase } from '../source/string/snakeCase';

describe('snakeCase', () => {
    test('snakeCase("Foo Bar") => "foo_bar"', () => {
        expect(snakeCase('Foo Bar')).toBe('foo_bar');
    });

    test('snakeCase("fooBar") => "foo_bar"', () => {
        expect(snakeCase('fooBar')).toBe('foo_bar');
    });

    test('snakeCase("--FOO-BAR--") => "foo_bar"', () => {
        expect(snakeCase('--FOO-BAR--')).toBe('foo_bar');
    });
});
