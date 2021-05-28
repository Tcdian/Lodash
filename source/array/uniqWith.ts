import { uniq } from './uniq';
import { isFunction } from '../lang/isFunction';

type Comparator<T> = (a: T, b: T) => boolean;

function uniqWith<T>(array: T[], comparator?: Comparator<T>): T[] {
    if (!isFunction(comparator)) {
        return uniq(array);
    }
    return array.filter((arrVal, index) => {
        return array.findIndex((othVal) => comparator(arrVal, othVal)) === index;
    });
}

export { uniqWith };
