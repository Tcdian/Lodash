import { difference } from './difference';
import { iteratee } from '../util/iteratee';
import { identity } from '../util/identity';
import { isArrayLikeObject } from '../lang/isArrayLikeObject';
import { isUndefined } from '../lang/isUndefined';
import { last } from '../array/last';
import { initial } from '../array/initial';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type ValueIterator<T, TResult> = (value: T) => TResult;

function differenceBy<T0, T1>(
    array: T0[],
    other: T1[],
    predicate: ValueIterator<T0 | T1, unknown> | PropertyName
): T0[];
function differenceBy<T0, T1, T2>(
    array: T0[],
    other1: T1[],
    other2: T2[],
    predicate: ValueIterator<T0 | T1 | T2, unknown> | PropertyName
): T0[];
function differenceBy<T>(
    array: T[],
    ...others: [...values: T[][], predicate: ValueIterator<T, unknown> | PropertyName]
): T[];
function differenceBy<T>(
    array: T[],
    ...others: [...values: T[][], predicate: ValueIterator<T, unknown> | PropertyName]
): T[] {
    let predicate = last(others);
    if (isArrayLikeObject(predicate)) {
        return difference(array, ...(others as T[][]));
    }
    if (isUndefined(predicate)) {
        predicate = identity;
    }
    const iterateeFunc = iteratee(predicate);
    const values = flatten(initial(others) as T[][]);
    return array.filter((arrVal) => !values.some((othVal) => iterateeFunc(arrVal) === iterateeFunc(othVal)));
}

export { differenceBy };
