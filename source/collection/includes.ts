import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';
import { values } from '../object/values';

type PropertyName = string | number | symbol;

function includes(collection: string, value: string, fromIndex?: number): boolean;
function includes<T>(collection: T[] | Record<PropertyName, T>, value: T, fromIndex?: number): boolean;
function includes(collection: any, value: any, fromIndex = 0): boolean {
    if (isArray(collection) || isString(collection)) {
        return collection.includes(value, fromIndex);
    }
    return values(collection).includes(value, fromIndex);
}

export { includes };
