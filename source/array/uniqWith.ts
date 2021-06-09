import { uniq } from './uniq';
import { isFunction } from '../lang/isFunction';
import { findIndex } from './findIndex';

type Comparator<T0, T1> = (a: T0, b: T1) => boolean;

function uniqWith<T>(array: T[], comparator?: Comparator<T, T>): T[] {
    if (!isFunction(comparator)) {
        return uniq(array);
    }
    return array.filter((arrVal, index) => {
        return findIndex(array, (othVal) => comparator(arrVal, othVal)) === index;
    });
}

export { uniqWith };
