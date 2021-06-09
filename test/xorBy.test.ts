import { xorBy } from '../source/array/xorBy';

describe('xorBy', () => {
    test('xorBy iterator', () => {
        expect(xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2, 3.4]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')).toEqual([{ x: 2 }]);
    });
});
