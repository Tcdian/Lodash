import { isWeakMap } from '../source/lang/isWeakMap';

describe('isWeakMap', () => {
    test('isWeakMap(new WeakMap) => true', () => {
        expect(isWeakMap(new WeakMap())).toBe(true);
    });

    test('isWeakMap(new Map) => false', () => {
        expect(isWeakMap(new Map())).toBe(false);
    });
});
