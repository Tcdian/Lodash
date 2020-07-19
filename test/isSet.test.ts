import { isSet } from '../source/lang/isSet';

test(`isSet(new Set) => ${isSet(new Set())}`, () => {
    expect(isSet(new Set())).toBe(true);
});

test(`isSet(new WeakSet) => ${isSet(new WeakSet())}`, () => {
    expect(isSet(new WeakSet())).toBe(false);
});
