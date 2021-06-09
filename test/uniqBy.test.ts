import { uniqBy } from '../source/array/uniqBy';

describe('uniqBy', () => {
    test('uniqBy iterator', () => {
        expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], 'x')).toEqual([{ x: 1 }, { x: 2 }]);
    });
});
