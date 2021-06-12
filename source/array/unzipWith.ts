import { unzip } from './unzip';
import { identity } from '../util/identity';

function unzipWith<T>(array: T[][]): T[];
function unzipWith<T, R>(array: T[][], iteratee: (...values: T[]) => R): R[];
function unzipWith<T>(array: T[][], iteratee: (...values: T[]) => any = identity): any[] {
    return unzip(array).map((arrVal) => iteratee(...arrVal));
}

export { unzipWith };
