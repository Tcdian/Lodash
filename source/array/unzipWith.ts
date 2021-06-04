import { unzip } from './unzip';
import { identity } from '../util/identity';

function unzipWith<T, TResult>(
    array: T[][],
    iteratee: (...values: T[]) => TResult = identity as any as (...values: T[]) => TResult
): TResult[] {
    return unzip(array).map((arrVal) => iteratee(...arrVal));
}

export { unzipWith };
