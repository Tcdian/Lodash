import { difference } from './difference';
import { iteratee } from '../util/iteratee';
import { identity } from '../util/identity';
import { isArrayLikeObject } from '../lang/isArrayLikeObject';
import { isUndefined } from '../lang/isUndefined';
import { last } from '../array/last';
import { initial } from '../array/initial';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function differenceBy<T, T1>(array: T[], other: T1[], predicate: ValueIterateeCustom<T | T1, unknown>): T[];
function differenceBy<T, T1, T2>(
    array: T[],
    other1: T1[],
    other2: T2[],
    predicate: ValueIterateeCustom<T | T1 | T2, unknown>
): T[];
function differenceBy<T>(array: T[], ...others: [...values: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[];
function differenceBy<T>(array: T[], ...others: [...values: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[] {
    let predicate = last(others);
    if (isArrayLikeObject(predicate)) {
        return difference(array, ...(others as T[][]));
    }
    if (isUndefined(predicate)) {
        predicate = identity;
    }
    const iterateeFunc = iteratee(predicate);
    const values = flatten(initial(others) as T[][]);
    return array.filter((arrVal) => !values.some((othVal) => Object.is(iterateeFunc(arrVal), iterateeFunc(othVal))));
}

export { differenceBy };
