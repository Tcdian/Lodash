import { last } from './last';
import { initial } from './initial';
import { isFunction } from '../lang/isFunction';
import { zip } from './zip';

function zipWith<T, TResult>(array: T[], iteratee: (value: T) => TResult): TResult[];
function zipWith<T1, T2, TResult>(array1: T1[], array2: T2[], iteratee: (value1: T1, value2: T2) => TResult): TResult[];
function zipWith<T, TResult>(...args: [...arrays: T[][], iteratee: (...group: T[]) => TResult]): TResult[];
function zipWith<T, TResult>(...args: [...arrays: T[][], iteratee: (...group: T[]) => TResult]): TResult[] {
    const iteratee = last(args);
    if (!isFunction(iteratee)) {
        return zip(...(args as T[][])) as any as TResult[];
    }
    return zip(...(initial(args) as T[][])).map((arrVal) => iteratee(...arrVal));
}

export { zipWith };
