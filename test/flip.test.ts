import _ from 'lodash';
import { flip } from '../source/function/flip';

function combine(a: string, b: string, c: string) {
    return a + b + c;
}

test('flip 函数测试', () => {
    const flipped = flip(combine);
    expect(flipped('a', 'b', 'c')).toEqual(_.flip(combine)('a', 'b', 'c'));
});
