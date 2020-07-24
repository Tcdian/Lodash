import { overArgs } from '../source/function/overArgs';

function doubled(n: number) {
    return n * 2;
}

function square(n: number) {
    return n * n;
}

test('overArgs', () => {
    const func = overArgs(
        function (x, y) {
            return [x, y];
        },
        [square, doubled]
    );
    expect(func(9, 3)).toEqual([81, 6]);
    expect(func(10, 5)).toEqual([100, 10]);
});
