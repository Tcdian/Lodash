import _ from 'lodash';
import { attempt } from '../source/util';

function throwError(message: string): never {
    throw new Error(message);
}

test('throwError', () => {
    expect(attempt(throwError, 'error')).toEqual(_.attempt(throwError, 'error'));
});

function add(a: number, b: number): number {
    return a + b;
}

test('add', () => {
    expect(attempt(add, 1, 2)).toBe(_.attempt(add, 1, 2));
});
