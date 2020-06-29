import _ from 'lodash';
import { replace } from '../source/string';

test(`replace('Hi Fred', 'Fred', 'Barney') => ${replace('Hi Fred', 'Fred', 'Barney')}`, () => {
    expect(replace('Hi Fred', 'Fred', 'Barney')).toBe(_.replace('Hi Fred', 'Fred', 'Barney'));
});
