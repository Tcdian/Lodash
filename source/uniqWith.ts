import uniq from './uniq';
import isUndefined from './isUndefined';

type Comparator<T> = (a: T, b: T) => boolean;

function uniqWith<T>(array: T[], comparator?: Comparator<T>): T[] {
    if (isUndefined(comparator)) {
        return uniq(array);
    }
    return array.filter((arrVal, index) => {
        return array.findIndex((othVal) => comparator(arrVal, othVal)) === index;
    });
}

export default uniqWith;
