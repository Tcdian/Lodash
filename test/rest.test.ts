import { rest } from '../source/function/rest';
import { initial } from '../source/array/initial';
import { last } from '../source/array/last';
// todo ...
import _ from 'lodash';

test('rest', () => {
    const say = rest(function (what, names) {
        return what + ' ' + initial(names).join(', ') + (_.size(names) > 1 ? ', & ' : '') + last(names);
    });

    expect(say('hello', 'fred', 'barney', 'pebbles')).toBe('hello fred, barney, & pebbles');
});
