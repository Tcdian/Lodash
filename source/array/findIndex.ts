import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;

function findIndex<T>(array: T[], predicate: ArrayIterateeCustom<T, unknown> = identity, fromIndex = 0): number {
    const iterateeFunc = iteratee(predicate);
    const len = array.length;
    for (let i = fromIndex; i < len; i++) {
        if (iterateeFunc(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

export { findIndex };
