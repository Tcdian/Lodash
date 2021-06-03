import { toLower } from '../source/string/toLower';

describe('toLower', () => {
    test('toLower("--Foo-Bar--") => "--foo-bar--"', () => {
        expect(toLower('--Foo-Bar--')).toBe('--foo-bar--');
    });

    test('toLower("fooBar") => "foobar"', () => {
        expect(toLower('fooBar')).toBe('foobar');
    });

    test('toLower("__FOO_BAR__") => "__foo_bar__"', () => {
        expect(toLower('__FOO_BAR__')).toBe('__foo_bar__');
    });
});
