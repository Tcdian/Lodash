import _ from 'lodash';
import { chunk } from '../source/array';

test(`chunk(['a', 'b', 'c', 'd'], 2) => ${chunk(['a', 'b', 'c', 'd'], 2)}`, () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual(_.chunk(['a', 'b', 'c', 'd'], 2));
});

test(`chunk(['a', 'b', 'c', 'd'], 3) => ${chunk(['a', 'b', 'c', 'd'], 3)}`, () => {
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual(_.chunk(['a', 'b', 'c', 'd'], 3));
});
