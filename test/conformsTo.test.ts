import { conformsTo } from '../source/lang/conformsTo';

describe('conformsTo', () => {
    const object = { a: 1, b: 2 };

    test('return true', () => {
        expect(conformsTo(object, { b: (n) => n > 1 })).toBe(true);
    });

    test('return false', () => {
        expect(conformsTo(object, { b: (n) => n > 2 })).toBe(false);
    });
});
