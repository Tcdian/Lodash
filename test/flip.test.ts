import { flip } from '../source/function/flip';

describe('flip', () => {
    function combine(a: string, b: string, c: string) {
        return a + b + c;
    }

    test('invoke fun with arguments reversed', () => {
        const flipped = flip(combine);
        expect(flipped('a', 'b', 'c')).toEqual('cba');
    });
});
