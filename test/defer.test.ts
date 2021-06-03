import { defer } from '../source/function/defer';

describe('defer', () => {
    jest.useFakeTimers();

    test('defer invoke', () => {
        const mockFn = jest.fn();
        defer(mockFn, 'first', 'second');
        expect(mockFn).not.toBeCalled();
        jest.advanceTimersByTime(0);
        expect(mockFn).toBeCalled();
        expect(mockFn.mock.calls).toEqual([['first', 'second']]);
    });
});
