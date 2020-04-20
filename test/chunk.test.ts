import _ from 'lodash';
import chunk from '../source/chunk';

test(`chunk(['a', 'b', 'c', 'd'], 2) => ${_.chunk(['a', 'b', 'c', 'd'], 2)}`, () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual(_.chunk(['a', 'b', 'c', 'd'], 2));
});

test(`chunk(['a', 'b', 'c', 'd'], 3) => ${_.chunk(['a', 'b', 'c', 'd'], 3)}`, () => {
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual(_.chunk(['a', 'b', 'c', 'd'], 3));
});
