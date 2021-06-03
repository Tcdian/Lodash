import { isFunction } from '../lang/isFunction';
import { isObject } from '../lang/isObject';
import { isArray } from '../lang/isArray';
import { identity } from './identity';

//todo ...
type Func = (...args: any[]) => any;
type PropertyName = string | number | symbol;

function iteratee<T extends Func>(func?: T): T;
function iteratee<T>(value: PropertyName | T[] | Record<PropertyName, T>): Func;
function iteratee(value: any = identity): Func {
    if (isFunction(value)) {
        return value;
    }
    if (isObject(value)) {
    }
}
