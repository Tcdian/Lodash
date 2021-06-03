import { max } from '../source/math/max';

describe('max', () => {
    test('max([4, 2, 8, 6]) => 8', () => {
        expect(max([4, 2, 8, 6])).toBe(8);
    });

    test('max(["a", "b", "c"]) => "c"', () => {
        expect(max(['a', 'b', 'c'])).toBe('c');
    });

    test('max([]) => undefined', () => {
        expect(max([])).toBe(undefined);
    });
});
