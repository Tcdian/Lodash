import debounce from '../source/debounce';

jest.useFakeTimers();

test('debounce', () => {
    const mockFn = jest.fn((x: number) => x);
    const debounced = debounce(mockFn, 1000);
    debounced(1);
    expect(mockFn).not.toBeCalled();
    debounced(2);
    jest.advanceTimersByTime(500);
    expect(mockFn).not.toBeCalled();
    debounced(3);
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(3);
});

test('debounce cancel', () => {
    const mockFn = jest.fn();
    const debounced = debounce(mockFn, 1000);
    debounced();
    jest.advanceTimersByTime(500);
    debounced.cancel();
    jest.advanceTimersByTime(1000);
    expect(mockFn).not.toBeCalled();
});

test('debounce flush', () => {
    const mockFn = jest.fn();
    const debounced = debounce(mockFn, 1000);
    debounced();
    jest.advanceTimersByTime(500);
    debounced.flush();
    expect(mockFn).toBeCalled();
});

test('debounce leading = true', () => {
    const mockFn = jest.fn();
    const debounced = debounce(mockFn, 1000, { leading: true });
    debounced();
    expect(mockFn).toBeCalledTimes(1);
    debounced();
    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(1);
    debounced();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(2);
});
