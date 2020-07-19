import { toUpper } from '../source/string/toUpper';

test(`toUpper('--foo-bar--') => ${toUpper('--foo-bar--')}`, () => {
    expect(toUpper('--foo-bar--')).toBe('--FOO-BAR--');
});

test(`toUpper('fooBar') => ${toUpper('fooBar')}`, () => {
    expect(toUpper('fooBar')).toBe('FOOBAR');
});

test(`toUpper('__foo_bar__') => ${toUpper('__foo_bar__')}`, () => {
    expect(toUpper('__foo_bar__')).toBe('__FOO_BAR__');
});
