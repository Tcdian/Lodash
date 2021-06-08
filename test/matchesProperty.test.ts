import { matchesProperty } from '../source/util/matchesProperty';
import { find } from '../source/collection/find';

describe('matchesProperty', () => {
    test('matchesProperty', () => {
        const objects = [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
        ];

        expect(find(objects, matchesProperty('a', 4))).toEqual({ a: 4, b: 5, c: 6 });
    });
});
