import { rest } from '../source/function/rest';
import { initial } from '../source/array/initial';
import { last } from '../source/array/last';
import { size } from '../source/collection/size';

describe('rest', () => {
    test('rest parameter', () => {
        const say = rest((what: string, names: string[]) => {
            return what + ' ' + initial(names).join(', ') + (size(names) > 1 ? ', & ' : '') + last(names);
        });
        expect(say('hello', 'fred', 'barney', 'pebbles')).toBe('hello fred, barney, & pebbles');
    });
});
