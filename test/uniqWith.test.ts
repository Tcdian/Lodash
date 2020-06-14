import _ from 'lodash';
import uniqWith from '../source/uniqWith';

const objects = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
];

test("uniqWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }], _.isEqual)", () => {
    expect(uniqWith(objects, _.isEqual)).toEqual(_.uniqWith(objects, _.isEqual));
});
