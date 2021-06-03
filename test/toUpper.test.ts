import { toUpper } from '../source/string/toUpper';

describe('toUpper', () => {
    test('toUpper("--foo-bar--") => "--FOO-BAR--', () => {
        expect(toUpper('--foo-bar--')).toBe('--FOO-BAR--');
    });

    test('toUpper("fooBar") => "FOOBAR"', () => {
        expect(toUpper('fooBar')).toBe('FOOBAR');
    });

    test('toUpper("__foo_bar__") => "__FOO_BAR__"', () => {
        expect(toUpper('__foo_bar__')).toBe('__FOO_BAR__');
    });
});
