import { isNull } from '../source/lang/isNull';

describe('isNull', () => {
    test('isNull(null) => true', () => {
        expect(isNull(null)).toBe(true);
    });

    test('isNull(void 0) => false', () => {
        expect(isNull(void 0)).toBe(false);
    });
});
