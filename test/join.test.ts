import _ from 'lodash';
import join from '../source/join';

test(`join(['a', 'b', 'c'], '~') => ${join(['a', 'b', 'c'], '~')}`, () => {
    expect(join(['a', 'b', 'c'], '~')).toBe(_.join(['a', 'b', 'c'], '~'));
});
