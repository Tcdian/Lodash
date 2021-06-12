import { isTypedArray } from '../source/lang/isTypedArray';

describe('isTypedArray', () => {
    test('isTypedArray(new Uint8Array()) => true', () => {
        expect(isTypedArray(new Uint8Array())).toBe(true);
    });

    test('isTypedArray([]) => false', () => {
        expect(isTypedArray([])).toBe(false);
    });
});
