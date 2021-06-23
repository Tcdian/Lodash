import { attempt } from '../source/util/attempt';

describe('attempt', () => {
    function throwError(message: string): never {
        throw new Error(message);
    }

    function add(a: number, b: number): number {
        return a + b;
    }

    test('throwError', () => {
        expect(attempt(throwError, 'error')).toEqual(new Error('error'));
    });

    test('add', () => {
        expect(attempt(add, 1, 2)).toBe(3);
    });
});
