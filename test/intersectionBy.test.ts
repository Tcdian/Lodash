import { intersectionBy } from '../source/array/intersectionBy';

describe('intersectionBy', () => {
    test('iterator', () => {
        expect(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x')).toEqual([{ x: 1 }]);
    });
});
