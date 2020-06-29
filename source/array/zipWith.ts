import { last } from './last';
import { initial } from './initial';
import { isArray } from '../lang/isArray';
import { zip } from './zip';

function zipWith<T, TResult>(arrays: T[], iteratee: (value: T) => TResult): TResult[];
function zipWith<T1, T2, TResult>(
    arrays1: T1[],
    arrays2: T2[],
    iteratee: (value1: T1, value2: T2) => TResult
): TResult[];
function zipWith<T1, T2, T3, TResult>(
    arrays1: T1[],
    arrays2: T2[],
    arrays3: T3[],
    iteratee: (value1: T1, value2: T2, value3: T3) => TResult
): TResult[];
function zipWith<T1, T2, T3, T4, TResult>(
    arrays1: T1[],
    arrays2: T2[],
    arrays3: T3[],
    arrays4: T4[],
    iteratee: (value1: T1, value2: T2, value3: T3, value4: T4) => TResult
): TResult[];
function zipWith<T1, T2, T3, T4, T5, TResult>(
    arrays1: T1[],
    arrays2: T2[],
    arrays3: T3[],
    arrays4: T4[],
    arrays5: T5[],
    iteratee: (value1: T1, value2: T2, value3: T3, value4: T4, value5: T5) => TResult
): TResult[];
function zipWith<T, TResult>(...args: Array<((...group: T[]) => TResult) | T[]>): TResult[];
function zipWith<T, TResult>(...args: Array<((...group: T[]) => TResult) | T[]>): TResult[] | T[][] {
    const iteratee = last(args);
    if (isArray(iteratee)) {
        return zip(...(args as T[][]));
    }
    return zip(...(initial(args) as T[][])).map((arrVal) => iteratee(...arrVal));
}

export { zipWith };
