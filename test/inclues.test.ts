import _ from 'lodash';
import includes from '../source/includes';

test(`includes([1, 2, 3], 1) => ${includes([1, 2, 3], 1)}`, () => {
    expect(includes([1, 2, 3], 1)).toBe(_.includes([1, 2, 3], 1));
});

test(`includes([1, 2, 3], 1, 2) => ${includes([1, 2, 3], 1, 2)}`, () => {
    expect(includes([1, 2, 3], 1, 2)).toBe(_.includes([1, 2, 3], 1, 2));
});

test(`includes({ 'a': 1, 'b': 2 }, 1) => ${includes({ a: 1, b: 2 }, 1)}`, () => {
    expect(includes({ a: 1, b: 2 }, 1)).toBe(_.includes({ a: 1, b: 2 }, 1));
});

test(`includes('abcd', 'bc') => ${includes('abcd', 'bc')}`, () => {
    expect(includes('abcd', 'bc')).toBe(_.includes('abcd', 'bc'));
});
