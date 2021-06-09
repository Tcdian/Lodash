import { pullAllBy } from '../source/array/pullAllBy';

describe('pullAllBy', () => {
    test('pullAllBy iterator', () => {
        const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
        expect(pullAllBy(array, [{ x: 1 }, { x: 3 }], (o) => o.x)).toEqual([{ x: 2 }]);
        expect(array).toEqual([{ x: 2 }]);
    });

    test('The "property" iteratee shorthand.', () => {
        const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
        expect(pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x')).toEqual([{ x: 2 }]);
        expect(array).toEqual([{ x: 2 }]);
    });
});
