import { get } from './get';
import { isFunction } from '../lang/isFunction';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type Func<TS extends any[], R> = (...args: TS) => R;

function result<R>(object: any, path: Many<PropertyName>, defaultValue?: R | Func<any[], R>): R {
    const value = get(object, path, defaultValue);
    return isFunction(value) ? value.call(object) : value;
}

export { result };
