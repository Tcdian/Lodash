import { gte } from '../source/lang/gte';

describe('gte', () => {
    test('gte(3, 1) => true', () => {
        expect(gte(3, 1)).toBe(true);
    });

    test('gte(3, 3) => true', () => {
        expect(gte(3, 3)).toBe(true);
    });

    test('gte(1, 3) => true', () => {
        expect(gte(1, 3)).toBe(false);
    });
});
