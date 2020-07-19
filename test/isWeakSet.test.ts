import { isWeakSet } from '../source/lang/isWeakSet';

test(`isWeakSet(new WeakSet) => ${isWeakSet(new WeakSet())}`, () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
});

test(`isWeakSet(new Set) => ${isWeakSet(new Set())}`, () => {
    expect(isWeakSet(new Set())).toBe(false);
});
