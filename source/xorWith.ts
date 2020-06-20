import xor from './xor';
import last from './last';
import initial from './initial';
import isArray from './isArray';
import uniqWith from './uniqWith';
import flatten from './flatten';

type Comparator<T> = (a: T, b: T) => boolean;

function xorWith<T>(...args: (T[] | Comparator<T>)[]): T[] {
    const comparator = last(args);
    if (isArray(comparator)) {
        return xor(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    const uniqedArrays = arrays.map((array) => uniqWith(array, comparator));
    const flattened = flatten<T>(uniqedArrays);
    return flattened.filter(
        (arrVal, arrIndex, collection) =>
            !collection.find((othVal, othIndex) => arrIndex !== othIndex && comparator(arrVal, othVal))
    );
}

export default xorWith;
