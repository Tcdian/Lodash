import { lastIndexOf } from '../source/array/lastIndexOf';

describe('lastIndexOf', () => {
    test('lastIndexOf([1, 2, 1, 2], 2) => 3', () => {
        expect(lastIndexOf([1, 2, 1, 2], 2)).toBe(3);
    });

    test('lastIndexOf([1, 2, 1, 2], 2, 2) => 1', () => {
        expect(lastIndexOf([1, 2, 1, 2], 2, 2)).toBe(1);
    });
});
