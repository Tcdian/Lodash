import { sumBy } from '../source/math/sumBy';

describe('sumBy', () => {
    const objects = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];

    test('iterator', () => {
        expect(sumBy(objects, (o) => o.n)).toBe(20);
    });

    test('The "property" iteratee shorthand.', () => {
        expect(sumBy(objects, 'n')).toEqual(20);
    });
});
