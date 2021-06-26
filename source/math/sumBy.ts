import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function sumBy<T>(array: T[], predicate: ValueIterateeCustom<T, unknown> = identity): number {
    const iterativeFunc = iteratee(predicate);
    return array.reduce((previous, current) => previous + iterativeFunc(current), 0);
}

export { sumBy };
