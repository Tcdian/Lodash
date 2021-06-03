import { isUndefined } from '../source/lang/isUndefined';

describe('isUndefined', () => {
    test('isUndefined(void 0) => true', () => {
        expect(isUndefined(void 0)).toBe(true);
    });

    test('isUndefined(null) => false', () => {
        expect(isUndefined(null)).toBe(false);
    });
});
