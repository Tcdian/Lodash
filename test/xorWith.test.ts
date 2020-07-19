// todo ...
import _ from 'lodash';
import { xorWith } from '../source/array/xorWith';

const objects = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
];
const others = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
];

test("xorWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], _.isEqual)", () => {
    expect(xorWith(objects, others, _.isEqual)).toEqual([
        { x: 2, y: 1 },
        { x: 1, y: 1 },
    ]);
});
