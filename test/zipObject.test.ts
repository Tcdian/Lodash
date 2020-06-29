import _ from 'lodash';
import { zipObject } from '../source/array';

test("zipObject(['a', 'b'], [1, 2]) => { 'a': 1, 'b': 2 }", () => {
    expect(zipObject(['a', 'b'], [1, 2])).toEqual(_.zipObject(['a', 'b'], [1, 2]));
});
