import { isBoolean } from '../source/lang/isBoolean';

describe('isBoolean', () => {
    test('isBoolean(false) => true', () => {
        expect(isBoolean(false)).toBe(true);
    });

    test('isBoolean(null) => false', () => {
        expect(isBoolean(null)).toBe(false);
    });
});
