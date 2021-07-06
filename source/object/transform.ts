import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { entries } from '../object/entries';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type MemoVoidArrayIterator<T, R> = (prev: R, curr: T, index: number, collection: T[]) => void;
type MemoVoidStringIterator<R> = (prev: R, curr: string, index: number, collection: string) => void;
type MemoVoidRecordIterator<K extends PropertyName, V, R> = (
    prev: R,
    curr: V,
    key: K,
    collection: Record<K, V>
) => void;

function transform<T, R>(collection: T[], predicate?: MemoVoidArrayIterator<T, R>, accumulator?: R): R;
function transform<R>(collection: string, predicate?: MemoVoidStringIterator<R>, accumulator?: R): R;
function transform<K extends PropertyName, V, R>(
    collection: Record<K, V>,
    predicate?: MemoVoidRecordIterator<K, V, R>,
    accumulator?: R
): R;
function transform(collection: any, predicate: Func<any[], any> = identity, accumulator?: any): any {
    const iterativeFunc = iteratee(predicate);
    const pairs = entries(collection);
    accumulator = accumulator || Object.create(Object.getPrototypeOf(collection));
    for (let i = 0; i < pairs.length; i++) {
        let [key, value]: [PropertyName, unknown] = pairs[i];
        key = isArray(collection) || isString(collection) ? Number(key) : key;
        if (iterativeFunc(accumulator, value, key, collection) === false) {
            break;
        }
    }
    return accumulator;
}

export { transform };
