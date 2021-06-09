import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { values } from '../object/values';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function partition<T>(collection: T[], predicate?: ValueIterateeCustom<T, unknown>): [T[], T[]];
function partition(collection: string, predicate?: ValueIterateeCustom<string, unknown>): [string[], string[]];
function partition<K extends PropertyName, V>(
    collection: Record<K, V>,
    predicate?: ValueIterateeCustom<V, unknown>
): [V[], V[]];
function partition(collection: any, predicate: ValueIterateeCustom<any, unknown> = identity): [any[], any[]] {
    const result: [any[], any[]] = [[], []];
    const iterateeFunc = iteratee(predicate);
    values(collection).forEach((value) => {
        if (iterateeFunc(value)) {
            result[0].push(value);
        } else {
            result[1].push(value);
        }
    });
    return result;
}

export { partition };
