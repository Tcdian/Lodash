import { isArrayBuffer } from '../source/lang/isArrayBuffer';

describe('isArrayBuffer', () => {
    test('isArrayBuffer(new ArrayBuffer(2)) => true', () => {
        expect(isArrayBuffer(new ArrayBuffer(2))).toBe(true);
    });

    test('isArrayBuffer(new Array(2)) => false', () => {
        expect(isArrayBuffer(new Array(2))).toBe(false);
    });
});
