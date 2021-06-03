import { indexOf } from '../source/array/indexOf';

describe('indexOf', () => {
    test('indexOf([1, 2, 1, 2], 2) => 1', () => {
        expect(indexOf([1, 2, 1, 2], 2)).toEqual(1);
    });

    test('indexOf([1, 2, 1, 2], 2, 2) => 3', () => {
        expect(indexOf([1, 2, 1, 2], 2, 2)).toEqual(3);
    });
});
