import { xor } from './xor';
import { last } from './last';
import { initial } from './initial';
import { isFunction } from '../lang/isFunction';
import { uniqWith } from './uniqWith';
import { flatten } from './flatten';

type Comparator<T1, T2> = (a: T1, b: T2) => boolean;

function xorWith<T>(array: T[], comparator: Comparator<T, T>): T[];
function xorWith<T>(array1: T[], array2: T[], comparator: Comparator<T, T>): T[];
function xorWith<T>(...args: [...arrays: T[][], comparator: Comparator<T, T>]): T[];
function xorWith<T>(...args: [...arrays: T[][], comparator: Comparator<T, T>]): T[] {
    const comparator = last(args);
    if (!isFunction(comparator)) {
        return xor(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    const uniqedArrays = arrays.map((array) => uniqWith(array, comparator));
    const flattened = flatten(uniqedArrays);
    return flattened.filter(
        (arrVal, arrIndex, collection) =>
            !collection.find((othVal, othIndex) => arrIndex !== othIndex && comparator(arrVal, othVal))
    );
}

export { xorWith };
