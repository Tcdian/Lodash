import { sortedIndexBy } from '../source/array/sortedIndexBy';

describe('sortedIndexBy', () => {
    const objects = [{ x: 4 }, { x: 5 }];

    test('iterator', () => {
        expect(sortedIndexBy(objects, { x: 4 }, (o) => o.x)).toBe(0);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(sortedIndexBy(objects, { x: 5 }, 'x')).toBe(1);
    });
});
