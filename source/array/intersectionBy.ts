import { identity } from '../util/identity';
import { iteratee } from '../util/iteratee';
import { last } from './last';
import { initial } from './initial';
import { first } from './first';
import { tail } from './tail';
import { isUndefined } from '../lang/isUndefined';
import { isArrayLikeObject } from '../lang/isArrayLikeObject';
import { intersection } from './intersection';

type PropertyName = string | number | symbol;
type IterateeShorthand<T> = PropertyName | [PropertyName, any] | Partial<T>;
type ValueIterator<T, TResult> = (value: T) => TResult;
type ValueIterateeCustom<T, TResult> = ValueIterator<T, TResult> | IterateeShorthand<T>;

function intersectionBy<T>(array: T[], predicate: ValueIterateeCustom<T, unknown>): T[];
function intersectionBy<T>(array1: T[], array2: T[], predicate: ValueIterateeCustom<T, unknown>): T[];
function intersectionBy<T>(...args: [...arrays: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[];
function intersectionBy<T>(...args: [...arrays: T[][], predicate: ValueIterateeCustom<T, unknown>]): T[] {
    let predicate = last(args);
    if (isArrayLikeObject(predicate)) {
        return intersection(...(args as T[][]));
    }
    if (isUndefined(predicate)) {
        predicate = identity;
    }
    const iterateeFunc = iteratee(predicate);
    const arrays = initial(args) as T[][];
    const firstArray = first(arrays);
    const otherArrays = tail(arrays);
    if (isUndefined(firstArray)) {
        return [];
    }
    return firstArray.filter((arrVal, index) => {
        return (
            firstArray.indexOf(arrVal) === index &&
            otherArrays.every((otherArray) =>
                otherArray.some((othVal) => Object.is(iterateeFunc(arrVal), iterateeFunc(othVal)))
            )
        );
    });
}

export { intersectionBy };
