import rearg from '../source/rearg';

test('rearg 函数测试', () => {
    const rearged = rearg(
        function (a, b, c) {
            return [a, b, c];
        },
        [2, 0, 1]
    );

    expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
});
