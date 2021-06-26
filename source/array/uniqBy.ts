import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function uniqBy<T>(array: T[], predicate: ValueIterateeCustom<T, unknown> = identity): T[] {
    const iterativeFunc = iteratee(predicate);
    return array.filter((arrVal, index) => {
        return findIndex(array, (othVal) => Object.is(iterativeFunc(arrVal), iterativeFunc(othVal))) === index;
    });
}

export { uniqBy };
