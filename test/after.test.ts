import after from '../source/after';

test('after 函数测试', () => {
    const mockFn = jest.fn();
    const afterCalledFunc = after(2, mockFn);
    afterCalledFunc();
    expect(mockFn).not.toBeCalled();
    afterCalledFunc();
    expect(mockFn).toBeCalled();
    afterCalledFunc();
    expect(mockFn).toBeCalledTimes(2);
});
