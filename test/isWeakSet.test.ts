import { isWeakSet } from '../source/lang/isWeakSet';

describe('isWeakSet', () => {
    test('isWeakSet(new WeakSet) => true', () => {
        expect(isWeakSet(new WeakSet())).toBe(true);
    });

    test('isWeakSet(new Set) => true', () => {
        expect(isWeakSet(new Set())).toBe(false);
    });
});
