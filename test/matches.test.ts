import { matches } from '../source/util/matches';
// todo ...
import _ from 'lodash';

describe('matches', () => {
    test('matches', () => {
        const objects = [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 },
        ];

        expect(_.filter(objects, matches({ a: 4, c: 6 }))).toEqual([{ a: 4, b: 5, c: 6 }]);
    });
});
