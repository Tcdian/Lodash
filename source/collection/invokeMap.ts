import { values } from '../object/values';
import { isFunction } from '../lang/isFunction';
import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

type TRFunc<T> = (...args: any) => T;

function invokeMap<TResult>(collection: any, method: TRFunc<TResult>, ...args: any[]): TResult[];
function invokeMap(collection: any, path: PropertyPath, ...args: any[]): any;
function invokeMap(collection: any, path: TRFunc<any> | PropertyPath, ...args: any[]): any[] {
    return values(collection).map((value) => {
        const method = isFunction(path) ? path : get(value, path);
        return method.call(value, ...args);
    });
}

export { invokeMap };
