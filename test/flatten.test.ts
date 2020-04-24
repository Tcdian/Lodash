import _ from 'lodash';
import flatten from '../source/flatten';

test(`flatten([1, [2, [3, [4]], 5]]) => ${flatten([1, [2, [3, [4]], 5]])}`, () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual(_.flatten([1, [2, [3, [4]], 5]]));
});
