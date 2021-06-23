import { sortedUniqBy } from '../source/array/sortedUniqBy';

describe('sortedUniqBy', () => {
    test('iterator', () => {
        expect(sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor)).toEqual([1.1, 2.3]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(sortedUniqBy([{ x: 1 }, { x: 1 }, { x: 2 }], 'x')).toEqual([{ x: 1 }, { x: 2 }]);
    });
});
