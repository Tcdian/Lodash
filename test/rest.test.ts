import _ from 'lodash';
import rest from '../source/rest';

test('rest 函数测试', () => {
    const say = rest(function (what, names) {
        return what + ' ' + _.initial(names).join(', ') + (_.size(names) > 1 ? ', & ' : '') + _.last(names);
    });

    expect(say('hello', 'fred', 'barney', 'pebbles')).toBe('hello fred, barney, & pebbles');
});
