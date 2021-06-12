import { minBy } from '../source/math/minBy';

describe('minBy ', () => {
    const objects = [{ n: 1 }, { n: 2 }];

    test('minBy  iterator', () => {
        expect(minBy(objects, (o) => o.n)).toEqual({ n: 1 });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(minBy(objects, 'n')).toEqual({ n: 1 });
    });
});
