import { min } from '../source/math/min';

describe('min', () => {
    test('min([4, 2, 8, 6]) => 2', () => {
        expect(min([4, 2, 8, 6])).toBe(2);
    });

    test('min(["a", "b", "c"]) => "a"', () => {
        expect(min(['a', 'b', 'c'])).toBe('a');
    });

    test('min([]) => undefined', () => {
        expect(min([])).toBe(undefined);
    });
});
