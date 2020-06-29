import { unzip } from './unzip';
import { isUndefined } from '../lang/isUndefined';

function unzipWith<T, TResult>(array: T[][], iteratee?: (...value: T[]) => TResult): TResult[];
function unzipWith<T, TResult>(array: T[][], iteratee?: (...value: T[]) => TResult) {
    if (isUndefined(iteratee)) {
        return unzip(array);
    }
    return unzip(array).map((arrVal) => iteratee(...arrVal));
}

export { unzipWith };
