import { lte } from '../source/lang/lte';

describe('lte', () => {
    test('lte(1, 3) => true', () => {
        expect(lte(1, 3)).toBe(true);
    });

    test('lte(3, 3) => true', () => {
        expect(lte(3, 3)).toBe(true);
    });

    test('lte(3, 1) => true', () => {
        expect(lte(3, 1)).toBe(false);
    });
});
