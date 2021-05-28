import { unzip } from './unzip';
import { isFunction } from '../lang/isFunction';

function unzipWith<T>(array: T[][]): T[][];
function unzipWith<T, TResult>(array: T[][], iteratee: (...values: T[]) => TResult): TResult[];
function unzipWith<T, TResult>(array: T[][], iteratee?: (...values: T[]) => TResult): (T[] | TResult)[] {
    if (!isFunction(iteratee)) {
        return unzip(array);
    }
    return unzip(array).map((arrVal) => iteratee(...arrVal));
}

export { unzipWith };
