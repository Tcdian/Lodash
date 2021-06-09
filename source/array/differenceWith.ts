import { flatten } from './flatten';
import { difference } from './difference';
import { isFunction } from '../lang/isFunction';
import { last } from './last';
import { initial } from './initial';

type Comparator<T0, T1> = (a: T0, b: T1) => boolean;

function differenceWith<T0, T1>(array: T0[], other: T1[], comparator: Comparator<T0, T1>): T0[];
function differenceWith<T0, T1, T2>(array: T0[], other1: T1[], other2: T2[], comparator: Comparator<T0, T1 | T2>): T0[];
function differenceWith<T>(array: T[], ...others: [...values: T[][], comparator: Comparator<T, T>]): T[];
function differenceWith<T>(array: T[], ...others: [...values: T[][], comparator: Comparator<T, T>] | T[][]): T[] {
    const comparator = last(others);
    if (!isFunction(comparator)) {
        return difference(array, ...(others as T[][]));
    }
    const values = flatten(initial(others) as T[][]);
    return array.filter((arrVal) => !values.some((othVal) => comparator(arrVal, othVal)));
}

export { differenceWith };
