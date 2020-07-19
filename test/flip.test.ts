import { flip } from '../source/function/flip';

function combine(a: string, b: string, c: string) {
    return a + b + c;
}

test('flip', () => {
    const flipped = flip(combine);
    expect(flipped('a', 'b', 'c')).toEqual('cba');
});
