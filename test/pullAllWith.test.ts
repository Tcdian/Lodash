import _ from 'lodash';
import { pullAllWith } from '../source/array/pullAllWith';

const array = [
    { x: 1, y: 2 },
    { x: 3, y: 4 },
    { x: 5, y: 6 },
];

test("pullAllWith([{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }], [{ 'x': 3, 'y': 4 }], _.isEqual)", () => {
    pullAllWith(array, [{ x: 3, y: 4 }], _.isEqual);
    expect(array).toEqual([
        { x: 1, y: 2 },
        { x: 5, y: 6 },
    ]);
});
