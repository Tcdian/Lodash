import { maxBy } from '../source/math/maxBy';

describe('maxBy', () => {
    const objects = [{ n: 1 }, { n: 2 }];

    test('maxBy iterator', () => {
        expect(maxBy(objects, (o) => o.n)).toEqual({ n: 2 });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(maxBy(objects, 'n')).toEqual({ n: 2 });
    });
});
