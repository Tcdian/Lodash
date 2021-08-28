import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function sortedLastIndexBy<T>(array: T[], value: T, predicate: ValueIterateeCustom<T, unknown> = identity): number {
    const iterativeFunc = iteratee(predicate);
    let left = 0;
    let right = array.length;
    while (left < right) {
        const mid = (left + right) >> 1;
        if (iterativeFunc(array[mid]) <= iterativeFunc(value)) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

export { sortedLastIndexBy };
