import { defer } from '../source/function/defer';

jest.useFakeTimers();

test('defer', () => {
    const mockFn = jest.fn();
    defer(mockFn, 'first', 'second');
    expect(mockFn).not.toBeCalled();
    jest.advanceTimersByTime(0);
    expect(mockFn).toBeCalled();
    expect(mockFn.mock.calls).toEqual([['first', 'second']]);
});
