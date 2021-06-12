import { pullAll } from './pullAll';
import { isFunction } from '../lang/isFunction';
import { findIndex } from './findIndex';

type Comparator<T1, T2> = (a: T1, b: T2) => boolean;

function pullAllWith<T, T1>(array: T[], values: T1[], comparator?: Comparator<T, T1>): T[] {
    if (!isFunction(comparator)) {
        return pullAll(array, values as any as T[]);
    }
    values.forEach((othVal) => {
        let fromIndex = 0;
        while ((fromIndex = findIndex(array, (arrVal) => comparator(arrVal, othVal), fromIndex)) > -1) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export { pullAllWith };
