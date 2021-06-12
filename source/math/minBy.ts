import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isEmpty } from '../lang/isEmpty';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function minBy<T>(array: T[], predicate: ValueIterateeCustom<T, unknown> = identity): T | undefined {
    if (isEmpty(array)) {
        return undefined;
    }
    const iterateeFunc = iteratee(predicate);
    return array.reduce((previous, current) => (iterateeFunc(previous) < iterateeFunc(current) ? previous : current));
}

export { minBy };
