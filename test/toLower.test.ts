import _ from 'lodash';
import { toLower } from '../source/string';

test(`toLower('--Foo-Bar--') => ${toLower('--Foo-Bar--')}`, () => {
    expect(toLower('--Foo-Bar--')).toBe(_.toLower('--Foo-Bar--'));
});

test(`toLower('fooBar') => ${toLower('fooBar')}`, () => {
    expect(toLower('fooBar')).toBe(_.toLower('fooBar'));
});

test(`toLower('__FOO_BAR__') => ${toLower('__FOO_BAR__')}`, () => {
    expect(toLower('__FOO_BAR__')).toBe(_.toLower('__FOO_BAR__'));
});
