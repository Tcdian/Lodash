import { map } from './map';
import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function orderBy<T>(collection: T[], iteratees?: ValueIterateeCustom<T, unknown>[], orders?: ('asc' | 'desc')[]): T[];
function orderBy<K extends PropertyName, V>(
    collection: Record<K, V>,
    iteratees?: ValueIterateeCustom<V, unknown>[],
    orders?: ('asc' | 'desc')[]
): V[];
function orderBy(
    collection: any,
    iteratees: ValueIterateeCustom<any, unknown>[] = [identity],
    orders: ('asc' | 'desc')[] = []
): any[] {
    const iterativeFuncs = iteratees.map((it) => iteratee(it));
    let index = -1;
    const wrapped = map(collection, (value) => {
        return {
            value: value,
            index: ++index,
            criteria: iterativeFuncs.map((iterativeFunc) => iterativeFunc(value)),
        };
    });
    return wrapped
        .sort((wrappedValue, wrappedOther) => {
            const valueCriteria = wrappedValue.criteria;
            const otherCriteria = wrappedOther.criteria;
            const len = valueCriteria.length;
            let index = -1;
            while (++index < len) {
                if (valueCriteria[index] !== otherCriteria[index]) {
                    const compared = valueCriteria[index] < otherCriteria[index] ? -1 : 1;
                    return compared * (orders[index] === 'desc' ? -1 : 1);
                }
            }
            return wrappedValue.index - wrappedOther.index;
        })
        .map(({ value }) => value);
}

export { orderBy };
