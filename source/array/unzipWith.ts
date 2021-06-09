import { unzip } from './unzip';
import { identity } from '../util/identity';

function unzipWith<T>(array: T[][]): T[];
function unzipWith<T, TResult>(array: T[][], iteratee: (...values: T[]) => TResult): TResult[];
function unzipWith<T>(array: T[][], iteratee: (...values: T[]) => any = identity): any[] {
    return unzip(array).map((arrVal) => iteratee(...arrVal));
}

export { unzipWith };
