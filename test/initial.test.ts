import { initial } from '../source/array/initial';

describe('initial', () => {
    test('initial([1, 2, 3]) => [1, 2]', () => {
        expect(initial([1, 2, 3])).toEqual([1, 2]);
    });
});
