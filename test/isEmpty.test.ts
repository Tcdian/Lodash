import { isEmpty } from '../source/lang/isEmpty';

test(`isEmpty(null) => ${isEmpty(null)}`, () => {
    expect(isEmpty(null)).toBe(true);
});

test(`isEmpty(true) => ${isEmpty(true)}`, () => {
    expect(isEmpty(true)).toBe(true);
});

test(`isEmpty(1) => ${isEmpty(1)}`, () => {
    expect(isEmpty(1)).toBe(true);
});

test(`isEmpty([1, 2, 3]) => ${isEmpty([1, 2, 3])}`, () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
});

test(`isEmpty({ 'a': 1 }) => ${isEmpty({ a: 1 })}`, () => {
    expect(isEmpty({ a: 1 })).toBe(false);
});
