import { throttle } from '../source/function';

jest.useFakeTimers();

test('throttle', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 1000);
    throttled(1);
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(1);
    throttled(2);
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(1);
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(2);
    expect(mockFn).toBeCalledWith(1);
});

test('throttle cancel', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 1000);
    throttled();
    expect(mockFn).toBeCalledTimes(1);
    throttled.cancel();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(1);
});

test('throttle flush', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 1000);
    throttled();
    throttled();
    expect(mockFn).toBeCalledTimes(1);
    throttled.flush();
    expect(mockFn).toBeCalledTimes(2);
});

test('throttle leading = false', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 1000, { leading: false });
    throttled();
    expect(mockFn).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalled();
    throttled();
    expect(mockFn).toBeCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(2);
    throttled();
    expect(mockFn).toBeCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(3);
});

test('throttle trailing = false', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 1000, { trailing: false });
    throttled();
    expect(mockFn).toBeCalledTimes(1);
    throttled();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(1);
});
