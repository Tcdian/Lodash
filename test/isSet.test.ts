import { isSet } from '../source/lang/isSet';

describe('isSet', () => {
    test('isSet(new Set) => true', () => {
        expect(isSet(new Set())).toBe(true);
    });

    test('isSet(new WeakSet) => false', () => {
        expect(isSet(new WeakSet())).toBe(false);
    });
});
