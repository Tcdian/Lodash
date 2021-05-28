import { isArray } from '../lang/isArray';
import { isString } from '../lang/isString';

type PropertyName = string | number | symbol;

function includes(collection: string, value: string, fromIndex?: number): boolean;
function includes<T>(collection: T[] | Record<PropertyName, T>, value: T, fromIndex?: number): boolean;
function includes<T>(collection: T[] | Record<PropertyName, T> | string, value: T, fromIndex = 0): boolean {
    if (isArray(collection)) {
        return collection.includes(value, fromIndex);
    } else if (isString(collection)) {
        return collection.includes(value as any as string, fromIndex);
    }
    return Object.values(collection).includes(value, fromIndex);
}

export { includes };
