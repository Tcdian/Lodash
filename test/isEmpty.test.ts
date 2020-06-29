import _ from 'lodash';
import { isEmpty } from '../source/lang';

test(`isEmpty(null) => ${isEmpty(null)}`, () => {
    expect(isEmpty(null)).toBe(_.isEmpty(null));
});

test(`isEmpty(true) => ${isEmpty(true)}`, () => {
    expect(isEmpty(true)).toBe(_.isEmpty(true));
});

test(`isEmpty(1) => ${isEmpty(1)}`, () => {
    expect(isEmpty(1)).toBe(_.isEmpty(1));
});

test(`isEmpty([1, 2, 3]) => ${isEmpty([1, 2, 3])}`, () => {
    expect(isEmpty([1, 2, 3])).toBe(_.isEmpty([1, 2, 3]));
});

test(`isEmpty({ 'a': 1 }) => ${isEmpty({ a: 1 })}`, () => {
    expect(isEmpty({ a: 1 })).toBe(_.isEmpty({ a: 1 }));
});
