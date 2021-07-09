import { identity } from '../util/identity';
import { isEmpty } from '../lang/isEmpty';
import { orderBy } from './orderBy';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;
type Many<T> = T | T[];

function sortBy<T>(collection: T[], ...iteratees: Many<ValueIterateeCustom<T, unknown>>[]): T[];
function sortBy<K extends PropertyName, V>(
    collection: Record<K, V>,
    ...iteratees: Many<ValueIterateeCustom<V, unknown>>[]
): V[];
function sortBy(collection: any, ...iteratees: Many<ValueIterateeCustom<any, unknown>>[]): any[] {
    if (isEmpty(iteratees)) {
        iteratees = [identity];
    }
    return orderBy(collection, flatten(iteratees));
}

export { sortBy };
