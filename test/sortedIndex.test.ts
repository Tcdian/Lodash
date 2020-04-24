import _ from 'lodash';
import sortedIndex from '../source/sortedIndex';

test(`sortedIndex([30, 50], 40) => ${sortedIndex([30, 50], 40)}`, () => {
    expect(sortedIndex([30, 50], 40)).toBe(_.sortedIndex([30, 50], 40));
});

test(`sortedIndex([30, 50], 60) => ${sortedIndex([30, 50], 60)}`, () => {
    expect(sortedIndex([30, 50], 60)).toBe(_.sortedIndex([30, 50], 60));
});

test(`sortedIndex([30, 50], 10) => ${sortedIndex([30, 50], 10)}`, () => {
    expect(sortedIndex([30, 50], 10)).toBe(_.sortedIndex([30, 50], 10));
});
