import { overArgs } from '../source/function/overArgs';

describe('overArgs', () => {
    function doubled(n: number) {
        return n * 2;
    }

    function square(n: number) {
        return n * n;
    }

    test('overArgs with square and doubled', () => {
        const func = overArgs((x, y) => [x, y], [square, doubled]);
        expect(func(9, 3)).toEqual([81, 6]);
        expect(func(10, 5)).toEqual([100, 10]);
    });
});
