import { pullAll } from './pullAll';
import { isFunction } from '../lang/isFunction';

type Comparator<T, V> = (a: T, b: V) => boolean;

function pullAllWith<T, V>(array: T[], values: V[], comparator?: Comparator<T, V>): T[] {
    if (!isFunction(comparator)) {
        return pullAll(array, values as any as T[]);
    }
    values.forEach((othVal) => {
        let fromIndex = 0;
        while ((fromIndex = array.findIndex((arrVal) => comparator(arrVal, othVal), fromIndex)) > -1) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export { pullAllWith };
