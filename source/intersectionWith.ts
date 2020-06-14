import intersection from './intersection';
import isArray from './isArray';
import first from './first';
import last from './last';
import initial from './initial';
import tail from './tail';

type comparator<T> = (a: T, b: T) => boolean;

function intersectionWith<T>(...arrays: (T[] | comparator<T>)[]): T[] {
    const comparator = last(arrays);
    if (isArray(comparator)) {
        return intersection(...(arrays as T[][]));
    }
    const allArrays = initial(arrays) as T[][];
    const firstArray = first(allArrays);
    const otherArrays = tail(allArrays);
    return firstArray.filter((arrVal, index) => {
        return (
            firstArray.indexOf(arrVal) === index &&
            otherArrays.every((otherArray) => otherArray.some((othVal) => comparator(arrVal, othVal)))
        );
    });
}

export default intersectionWith;
