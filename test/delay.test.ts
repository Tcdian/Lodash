import { delay } from '../source/function/delay';

describe('delay 1000 milliseconds', () => {
    jest.useFakeTimers();

    test('delay', () => {
        const mockFn = jest.fn();
        delay(mockFn, 1000, 'first', 'second');
        expect(mockFn).not.toBeCalled();
        jest.advanceTimersByTime(500);
        expect(mockFn).not.toBeCalled();
        jest.advanceTimersByTime(500);
        expect(mockFn).toBeCalledWith('first', 'second');
    });
});
