import { countBy } from '../source/collection/countBy';

describe('countBy', () => {
    test('iterator', () => {
        expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': 1, '6': 2 });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(countBy(['one', 'two', 'three'], 'length')).toEqual({ '3': 2, '5': 1 });
    });
});
