import { gt } from '../source/lang/gt';

describe('gt', () => {
    test('gt(3, 1) => true', () => {
        expect(gt(3, 1)).toBe(true);
    });

    test('gt(3, 3) => false', () => {
        expect(gt(3, 3)).toBe(false);
    });

    test('gt(1, 3) => false', () => {
        expect(gt(1, 3)).toBe(false);
    });
});
