import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function pullAllBy<T0, T1>(
    array: T0[],
    values: T1[],
    predicate: ValueIterateeCustom<T0 | T1, unknown> = identity
): T0[] {
    const iterateeFunc = iteratee(predicate);
    values.forEach((othVal) => {
        let fromIndex = 0;
        while (
            (fromIndex = findIndex(
                array,
                (arrVal) => Object.is(iterateeFunc(arrVal), iterateeFunc(othVal)),
                fromIndex
            )) > -1
        ) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export { pullAllBy };
