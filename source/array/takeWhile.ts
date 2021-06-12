import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';
import { slice } from './slice';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, R> = (value: T, index: number, collection: T[]) => R;
type ArrayIterateeCustom<T, R> = ArrayIterator<T, R> | IterateeShorthand<T>;

function takeWhile<T>(array: T[], predicate: ArrayIterateeCustom<T, unknown> = identity): T[] {
    const iterateeFunc = iteratee(predicate);
    const foundIndex = findIndex(array, (value, index, collection) => !iterateeFunc(value, index, collection));
    return foundIndex >= 0 ? slice(array, 0, foundIndex) : [...array];
}

export { takeWhile };
