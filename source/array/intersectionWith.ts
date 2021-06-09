import { intersection } from './intersection';
import { isFunction } from '../lang/isFunction';
import { isUndefined } from '../lang/isUndefined';
import { first } from './first';
import { last } from './last';
import { initial } from './initial';
import { tail } from './tail';

type Comparator<T0, T1> = (a: T0, b: T1) => boolean;

function intersectionWith<T0, T1>(array: T0[], other: T1[], comparator: Comparator<T0, T1>): T0[];
function intersectionWith<T0, T1, T2>(
    array: T0[],
    other1: T1[],
    other2: T2[],
    comparator: Comparator<T0, T1 | T2>
): T0[];
function intersectionWith<T>(...args: [...arrays: T[][], comparator: Comparator<T, T>]): T[];
function intersectionWith<T>(...args: [...arrays: T[][], comparator: Comparator<T, T>]): T[] {
    const comparator = last(args);
    if (!isFunction(comparator)) {
        return intersection(...(args as T[][]));
    }
    const arrays = initial(args) as T[][];
    const firstArray = first(arrays);
    const otherArrays = tail(arrays);
    if (isUndefined(firstArray)) {
        return [];
    }
    return firstArray.filter((arrVal, index) => {
        return (
            firstArray.indexOf(arrVal) === index &&
            otherArrays.every((otherArray) => otherArray.some((othVal) => comparator(arrVal, othVal)))
        );
    });
}

export { intersectionWith };
