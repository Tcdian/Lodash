import { isWeakMap } from '../source/lang/isWeakMap';

test(`isWeakMap(new WeakMap) => ${isWeakMap(new WeakMap())}`, () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
});

test(`isWeakMap(new Map) => ${isWeakMap(new Map())}`, () => {
    expect(isWeakMap(new Map())).toBe(false);
});
