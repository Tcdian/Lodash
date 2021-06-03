import { attempt } from '../source/util/attempt';

describe('attempt', () => {
    function throwError(message: string): never {
        throw new Error(message);
    }

    test('throwError', () => {
        expect(attempt(throwError, 'error')).toEqual(new Error('error'));
    });

    function add(a: number, b: number): number {
        return a + b;
    }

    test('add', () => {
        expect(attempt(add, 1, 2)).toBe(3);
    });
});
