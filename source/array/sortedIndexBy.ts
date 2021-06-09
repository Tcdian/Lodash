import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function sortedIndexBy<T>(array: T[], value: T, predicate: ValueIterateeCustom<T, unknown> = identity): number {
    const iterateeFunc = iteratee(predicate);
    const len = array.length;
    if (value > array[len - 1]) {
        return len;
    }
    let left = 0;
    let right = len - 1;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (iterateeFunc(array[mid]) < iterateeFunc(value)) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

export { sortedIndexBy };
