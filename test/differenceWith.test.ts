import _ from 'lodash';
import differenceWith from '../source/differenceWith';

const objects = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
];

test("differenceWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 2 }], _.isEqual)", () => {
    console.log(differenceWith(objects, [{ x: 1, y: 2 }], _.isEqual));
    expect(differenceWith(objects, [{ x: 1, y: 2 }], _.isEqual)).toEqual(
        _.differenceWith(objects, [{ x: 1, y: 2 }], _.isEqual)
    );
});
