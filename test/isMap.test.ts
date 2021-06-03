import { isMap } from '../source/lang/isMap';

describe('isMap', () => {
    test('isMap(new Map) => true', () => {
        expect(isMap(new Map())).toBe(true);
    });

    test('isMap(new WeakMap) => false', () => {
        expect(isMap(new WeakMap())).toBe(false);
    });
});
