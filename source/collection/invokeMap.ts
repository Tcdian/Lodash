import { values } from '../object/values';
import { isFunction } from '../lang/isFunction';
import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function invokeMap<R>(
    collection: Record<PropertyName, unknown> | unknown[],
    path: ((...args: any[]) => R) | PropertyPath,
    ...args: any[]
): R[] {
    return values(collection).map((value) => {
        const method = isFunction(path) ? path : get(value, path);
        return method.call(value, ...args);
    });
}

export { invokeMap };
