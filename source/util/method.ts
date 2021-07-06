import { get } from '../object/get';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function method(path: Many<PropertyName>, ...args: any[]) {
    return function (object: any): any {
        const func: Func<any[], any> = get(object, path);
        return func.call(object, ...args);
    };
}

export { method };
