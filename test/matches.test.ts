import { matches } from '../source/util/matches';
import { filter } from '../source/collection/filter';

describe('matches', () => {
    test('matches', () => {
        const objects = [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
        ];

        expect(filter(objects, matches({ a: 4, c: 6 }))).toEqual([{ a: 4, b: 5, c: 6 }]);
    });
});
