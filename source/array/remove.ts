import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { pullAt } from './pullAt';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;

function remove<T>(array: T[], predicate: ArrayIterateeCustom<T, unknown> = identity): T[] {
    const iterativeFunc = iteratee(predicate);
    const toBeDeleted: number[] = [];
    array.forEach((value, index, collection) => {
        if (iterativeFunc(value, index, collection)) {
            toBeDeleted.push(index);
        }
    });
    return pullAt(array, toBeDeleted);
}

export { remove };
