import { get } from '../object/get';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function methodOf(object: any, ...args: any[]) {
    return function (path: PropertyPath): any {
        const func: Func<any[], any> = get(object, path);
        return func.call(object, ...args);
    };
}

export { methodOf };
