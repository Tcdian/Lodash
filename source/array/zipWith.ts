import { last } from './last';
import { initial } from './initial';
import { isFunction } from '../lang/isFunction';
import { zip } from './zip';

function zipWith<T, R>(array: T[], iteratee: (value: T) => R): R[];
function zipWith<T1, T2, R>(array1: T1[], array2: T2[], iteratee: (value1: T1, value2: T2) => R): R[];
function zipWith<T, R>(...args: [...arrays: T[][], iteratee: (...group: T[]) => R]): R[];
function zipWith<T, R>(...args: [...arrays: T[][], iteratee: (...group: T[]) => R]): R[] {
    const iteratee = last(args);
    if (!isFunction(iteratee)) {
        return zip(...(args as T[][])) as any as R[];
    }
    return zip(...(initial(args) as T[][])).map((arrVal) => iteratee(...arrVal));
}

export { zipWith };
