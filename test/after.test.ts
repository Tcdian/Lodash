import { after } from '../source/function/after';

describe('after', () => {
    test('after 2 times', () => {
        const mockFn = jest.fn();
        const callAfter2Times = after(2, mockFn);
        callAfter2Times();
        expect(mockFn).not.toBeCalled();
        callAfter2Times();
        expect(mockFn).toBeCalledTimes(1);
        callAfter2Times();
        expect(mockFn).toBeCalledTimes(2);
    });
});
