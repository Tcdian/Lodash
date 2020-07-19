import { isMap } from '../source/lang/isMap';

test(`isMap(new Map) => ${isMap(new Map())}`, () => {
    expect(isMap(new Map())).toBe(true);
});

test(`isMap(new WeakMap) => ${isMap(new WeakMap())}`, () => {
    expect(isMap(new WeakMap())).toBe(false);
});
