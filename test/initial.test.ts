import _ from 'lodash';
import initial from '../source/initial';

test(`initial([1, 2, 3]) => ${initial([1, 2, 3])}`, () => {
    expect(initial([1, 2, 3])).toEqual(_.initial([1, 2, 3]));
});
