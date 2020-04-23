import _ from 'lodash';
import last from '../source/last';

test(`last([1, 2, 3]) => ${_.last([1, 2, 3])}`, () => {
    expect(last([1, 2, 3])).toBe(_.last([1, 2, 3]));
});
