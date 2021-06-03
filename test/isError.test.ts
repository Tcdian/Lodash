import { isError } from '../source/lang/isError';

describe('isError', () => {
    test('isError(new Error) => true', () => {
        expect(isError(new Error())).toBe(true);
    });

    test('isError(Error) => false', () => {
        expect(isError(Error)).toBe(false);
    });
});
