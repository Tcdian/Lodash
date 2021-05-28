import { values } from '../object/values';
import { isFunction } from '../lang/isFunction';
import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function invokeMap(collection: Record<PropertyName, unknown> | unknown[], path: PropertyPath, ...args: any[]): any[];
function invokeMap<TResult>(
    collection: Record<PropertyName, unknown> | unknown[],
    method: (...args: any[]) => TResult,
    ...args: any[]
): TResult[];
function invokeMap(
    collection: Record<PropertyName, unknown> | unknown[],
    path: ((...args: any[]) => any) | PropertyPath,
    ...args: any[]
): any[] {
    return values(collection).map((value) => {
        const method = isFunction(path) ? path : get(value, path);
        return method.call(value, ...args);
    });
}

export { invokeMap };
