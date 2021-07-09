import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { last } from './last';
import { initial } from './initial';
import { isArrayLikeObject } from '../lang/isArrayLikeObject';
import { uniqBy } from './uniqBy';
import { flatten } from './flatten';
import { xor } from './xor';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, R> = (value: T) => R;
type ValueIterateeCustom<T, R> = ValueIterator<T, R> | IterateeShorthand<T>;

function xorBy<T>(array: T[], predicate: ValueIterateeCustom<T, unknown>): T[];
function xorBy<T>(array1: T[], array2: T[], predicate: ValueIterateeCustom<T, unknown>): T[];
function xorBy<T>(...args: [...arrays: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[];
function xorBy<T>(...args: [...arrays: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[] {
    let predicate = last(args);
    if (isArrayLikeObject(predicate)) {
        return xor(...(args as T[][]));
    }
    if (predicate === undefined) {
        predicate = identity;
    }
    const iterativeFunc = iteratee(predicate);
    const arrays = initial(args) as T[][];
    const uniqedArrays = arrays.map((array) => uniqBy(array, iterativeFunc));
    const flattened = flatten<T>(uniqedArrays);
    return flattened.filter(
        (arrVal, arrIndex, collection) =>
            !collection.find(
                (othVal, othIndex) => arrIndex !== othIndex && Object.is(iterativeFunc(arrVal), iterativeFunc(othVal))
            )
    );
}

export { xorBy };
