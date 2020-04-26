import after from '../source/after';

test('after 函数测试', () => {
    const mockFn = jest.fn();
    const calledFunc = after(2, mockFn);
    calledFunc();
    expect(mockFn).not.toBeCalled();
    calledFunc();
    expect(mockFn).toBeCalledTimes(1);
    calledFunc();
    expect(mockFn).toBeCalledTimes(2);
});
