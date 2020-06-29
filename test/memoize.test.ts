import { memoize } from '../source/function';

test('memoize 函数测试', () => {
    const mockFn = jest.fn((value: string) => value);
    const memoized = memoize(mockFn);

    const first = memoized('first');
    expect(first).toBe('first');
    expect(mockFn).toBeCalledTimes(1);
    memoized('first');
    expect(mockFn).toBeCalledTimes(1);

    const second = memoized('second');
    expect(second).toBe('second');
    expect(mockFn).toBeCalledTimes(2);
    expect(memoized.cache).toEqual(
        new Map([
            ['first', 'first'],
            ['second', 'second'],
        ])
    );
});

test('memoize 函数测试', () => {
    const mockFn = jest.fn((value: string) => value);
    const memoized = memoize(mockFn, (key: string) => `key_${key}`);

    const first = memoized('first');
    expect(first).toBe('first');
    expect(mockFn).toBeCalledTimes(1);
    memoized('first');
    expect(mockFn).toBeCalledTimes(1);

    const second = memoized('second');
    expect(second).toBe('second');
    expect(mockFn).toBeCalledTimes(2);
    expect(memoized.cache).toEqual(
        new Map([
            ['key_first', 'first'],
            ['key_second', 'second'],
        ])
    );
});
