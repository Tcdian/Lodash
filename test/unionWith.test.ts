// todo ...
import _ from 'lodash';
import { unionWith } from '../source/array/unionWith';

const objects = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
];
const others = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
];

test("unionWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], _.isEqual)", () => {
    expect(unionWith(objects, others, _.isEqual)).toEqual([
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
    ]);
});
