import { get } from './get';
import { isFunction } from '../lang/isFunction';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function result<R>(object: any, path: PropertyPath, defaultValue?: R | Func<any[], R>): R {
    const value = get(object, path, defaultValue);
    return isFunction(value) ? value.call(object) : value;
}

export { result };
