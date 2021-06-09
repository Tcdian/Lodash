import { sortedLastIndexBy } from '../source/array/sortedLastIndexBy';

describe('sortedLastIndexBy', () => {
    const objects = [{ x: 4 }, { x: 5 }];

    test('sortedLastIndexBy iterator', () => {
        expect(sortedLastIndexBy(objects, { x: 4 }, (o) => o.x)).toBe(1);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(sortedLastIndexBy(objects, { x: 5 }, 'x')).toBe(2);
    });
});
