import { meanBy } from '../source/math/meanBy';

describe('meanBy', () => {
    const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];

    test('iterator', () => {
        expect(meanBy(objects, (o) => o.n)).toBe(5);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(meanBy(objects, 'n')).toEqual(5);
    });
});
