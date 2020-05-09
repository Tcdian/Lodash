import _ from 'lodash';
import toUpper from '../source/toUpper';

test(`toUpper('--foo-bar--') => ${toUpper('--foo-bar--')}`, () => {
    expect(toUpper('--foo-bar--')).toBe(_.toUpper('--foo-bar--'));
});

test(`toUpper('fooBar') => ${toUpper('fooBar')}`, () => {
    expect(toUpper('fooBar')).toBe(_.toUpper('fooBar'));
});

test(`toUpper('__foo_bar__') => ${toUpper('__foo_bar__')}`, () => {
    expect(toUpper('__foo_bar__')).toBe(_.toUpper('__foo_bar__'));
});
