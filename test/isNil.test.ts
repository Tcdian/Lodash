import { isNil } from '../source/lang/isNil';

describe('isNil', () => {
    test('isNil(null) => true', () => {
        expect(isNil(null)).toBe(true);
    });

    test('isNil(void 0) => true', () => {
        expect(isNil(void 0)).toBe(true);
    });

    test('isNil(NaN) => false', () => {
        expect(isNil(NaN)).toBe(false);
    });
});
