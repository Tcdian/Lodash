import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { findIndex } from './findIndex';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function pullAllBy<T, T1>(array: T[], values: T1[], predicate: ValueIterateeCustom<T | T1, unknown> = identity): T[] {
    const iterativeFunc = iteratee(predicate);
    values.forEach((othVal) => {
        let fromIndex = 0;
        while (
            (fromIndex = findIndex(
                array,
                (arrVal) => Object.is(iterativeFunc(arrVal), iterativeFunc(othVal)),
                fromIndex
            )) > -1
        ) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export { pullAllBy };
