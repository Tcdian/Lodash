import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';
import { slice } from './slice';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;

function dropWhile<T>(array: T[], predicate: ArrayIterateeCustom<T, unknown> = identity): T[] {
    const iterativeFunc = iteratee(predicate);
    const foundIndex = findIndex(array, (value, index, collection) => !iterativeFunc(value, index, collection));
    return foundIndex >= 0 ? slice(array, foundIndex) : [];
}

export { dropWhile };
