import { differenceBy } from '../source/array/differenceBy';

describe('differenceBy', () => {
    test('iterator', () => {
        expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], 'x')).toEqual([{ x: 2 }]);
    });
});
