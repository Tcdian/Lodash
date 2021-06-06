import { groupBy } from '../source/collection/groupBy';

describe('groupBy', () => {
    test('groupBy iterator', () => {
        expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': [4.2], '6': [6.1, 6.3] });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(groupBy(['one', 'two', 'three'], 'length')).toEqual({ '3': ['one', 'two'], '5': ['three'] });
    });
});
