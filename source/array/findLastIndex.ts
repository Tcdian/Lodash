import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;

function findLastIndex<T>(
    array: T[],
    predicate: ArrayIterateeCustom<T, unknown> = identity,
    fromIndex = array.length - 1
): number {
    const iterateeFunc = iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
        if (iterateeFunc(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

export { findLastIndex };
