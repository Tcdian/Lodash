import { pullAll } from './pullAll';
import { isFunction } from '../lang/isFunction';
import { findIndex } from './findIndex';

type Comparator<T0, T1> = (a: T0, b: T1) => boolean;

function pullAllWith<T0, T1>(array: T0[], values: T1[], comparator?: Comparator<T0, T1>): T0[] {
    if (!isFunction(comparator)) {
        return pullAll(array, values as any as T0[]);
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
