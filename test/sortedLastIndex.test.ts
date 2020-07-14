import _ from 'lodash';
import { sortedLastIndex } from '../source/array/sortedLastIndex';

test(`sortedLastIndex([30, 50], 40) => ${sortedLastIndex([30, 50], 40)}`, () => {
    expect(sortedLastIndex([30, 50], 40)).toBe(_.sortedLastIndex([30, 50], 40));
});

test(`sortedLastIndex([30, 50], 60) => ${sortedLastIndex([30, 50], 60)}`, () => {
    expect(sortedLastIndex([30, 50], 60)).toBe(_.sortedLastIndex([30, 50], 60));
});

test(`sortedLastIndex([30, 50], 10) => ${sortedLastIndex([30, 50], 10)}`, () => {
    expect(sortedLastIndex([30, 50], 10)).toBe(_.sortedLastIndex([30, 50], 10));
});
