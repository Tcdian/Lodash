// todo ...
import _ from 'lodash';
import { intersectionWith } from '../source/array/intersectionWith';

const objects = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
];
const others = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
];

test("intersectionWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], _.isEqual)", () => {
    expect(intersectionWith(objects, others, _.isEqual)).toEqual([{ x: 1, y: 2 }]);
});
