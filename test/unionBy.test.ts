import { unionBy } from '../source/array/unionBy';

describe('unionBy', () => {
    test('unionBy iterator', () => {
        expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')).toEqual([{ x: 1 }, { x: 2 }]);
    });
});
