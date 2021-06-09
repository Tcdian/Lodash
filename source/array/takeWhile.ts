import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';
import { slice } from './slice';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ArrayIterator<T, TResult> = (value: T, index: number, collection: T[]) => TResult;
type ArrayIterateeCustom<T, TResult> = ArrayIterator<T, TResult> | IterateeShorthand<T>;

function takeWhile<T>(array: T[], predicate: ArrayIterateeCustom<T, unknown> = identity): T[] {
    const iterateeFunc = iteratee(predicate);
    const foundIndex = findIndex(array, (value, index, collection) => !iterateeFunc(value, index, collection));
    return foundIndex >= 0 ? slice(array, 0, foundIndex) : [...array];
}

export { takeWhile };
