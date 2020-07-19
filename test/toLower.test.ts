import { toLower } from '../source/string/toLower';

test(`toLower('--Foo-Bar--') => ${toLower('--Foo-Bar--')}`, () => {
    expect(toLower('--Foo-Bar--')).toBe('--foo-bar--');
});

test(`toLower('fooBar') => ${toLower('fooBar')}`, () => {
    expect(toLower('fooBar')).toBe('foobar');
});

test(`toLower('__FOO_BAR__') => ${toLower('__FOO_BAR__')}`, () => {
    expect(toLower('__FOO_BAR__')).toBe('__foo_bar__');
});
