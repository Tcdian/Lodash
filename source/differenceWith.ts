import flatten from './flatten';
import difference from './difference';
import isArray from './isArray';
import last from './last';
import initial from './initial';

type Comparator<T> = (a: T, b: T) => boolean;

function differenceWith<T>(array: T[], ...values: (T[] | Comparator<T>)[]): T[] {
    const comparator = last(values);
    if (isArray(comparator)) {
        return difference(array, ...(values as T[][]));
    }
    const flattenedValues = flatten<T>(initial(values) as T[][]);
    return array.filter((arrVal) => !flattenedValues.some((othVal) => comparator(arrVal, othVal)));
}

export default differenceWith;
