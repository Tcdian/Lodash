/* eslint-disable @typescript-eslint/ban-types */
import { isFunction } from '../lang/isFunction';
import { isObject } from '../lang/isObject';
import { isArray } from '../lang/isArray';
import { isNil } from '../lang/isNil';
import { identity } from './identity';
import { matchesProperty } from './matchesProperty';
import { matches } from './matches';
import { property } from './property';

type Func = (...args: any[]) => any;

function iteratee<TFunc extends Func>(func: TFunc): TFunc;
function iteratee(value: any): Func;
function iteratee(value: any): Func {
    if (isNil(value)) {
        return identity;
    }
    if (isFunction(value)) {
        return value;
    }
    if (isObject(value)) {
        if (isArray(value)) {
            return matchesProperty(value[0], value[1]);
        }
        return matches(value);
    }
    return property(value);
}

export { iteratee };
