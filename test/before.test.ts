import before from '../source/before';

test('before 函数测试', () => {
    const mockFunc = jest
        .fn()
        .mockReturnValueOnce('first call')
        .mockReturnValueOnce('second call')
        .mockReturnValueOnce('third call');
    const calledFunc = before(3, mockFunc);
    // first call
    const first = calledFunc();
    expect(mockFunc).toBeCalledTimes(1);
    expect(first).toBe('first call');
    // second call
    const second = calledFunc();
    expect(mockFunc).toBeCalledTimes(2);
    expect(second).toBe('second call');
    // third call, mockFunc 只调用了两次, 返回第二次调用的结果
    const third = calledFunc();
    expect(mockFunc).toBeCalledTimes(2);
    expect(third).toBe('second call');
});
