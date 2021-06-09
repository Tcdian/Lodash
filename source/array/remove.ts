import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { pullAt } from './pullAt';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;

function remove<T>(array: T[], predicate: ArrayIterateeCustom<T, unknown> = identity): T[] {
    const iterateeFunc = iteratee(predicate);
    const toBeDeleted: number[] = [];
    array.forEach((value, index, collection) => {
        if (iterateeFunc(value, index, collection)) {
            toBeDeleted.push(index);
        }
    });
    return pullAt(array, toBeDeleted);
}

export { remove };