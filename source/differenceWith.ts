import flatten from './flatten';
import difference from './difference';
import isArray from './isArray';
import last from './last';
import initial from './initial';

type Comparator<T> = (a: T, b: T) => boolean;

function differenceWith<T>(array: T[], other: T[], comparator: Comparator<T>): T[];
function differenceWith<T>(array: T[], other1: T[], other2: T[], comparator: Comparator<T>): T[];
function differenceWith<T>(array: T[], other1: T[], other2: T[], other3: T[], comparator: Comparator<T>): T[];
function differenceWith<T>(
    array: T[],
    other1: T[],
    other2: T[],
    other3: T[],
    other4: T[],
    comparator: Comparator<T>
): T[];
function differenceWith<T>(
    array: T[],
    other1: T[],
    other2: T[],
    other3: T[],
    other4: T[],
    other5: T[],
    comparator: Comparator<T>
): T[];
function differenceWith<T>(array: T[], ...others: (T[] | Comparator<T>)[]): T[] {
    const comparator = last(others);
    if (isArray(comparator)) {
        return difference(array, ...(others as T[][]));
    }
    const flattenedValues = flatten<T>(initial(others) as T[][]);
    return array.filter((arrVal) => !flattenedValues.some((othVal) => comparator(arrVal, othVal)));
}

export default differenceWith;
