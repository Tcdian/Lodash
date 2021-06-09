import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function uniqBy<T>(array: T[], predicate: ValueIterateeCustom<T, unknown> = identity): T[] {
    const iterateeFunc = iteratee(predicate);
    return array.filter((arrVal, index) => {
        return findIndex(array, (othVal) => Object.is(iterateeFunc(arrVal), iterateeFunc(othVal))) === index;
    });
}

export { uniqBy };
