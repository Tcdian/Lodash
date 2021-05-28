import { get } from '../object/get';

type Func = (...args: any) => any;
type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function methodOf(object: any, ...args: any[]) {
    return function (path: PropertyPath): any {
        const func: Func = get(object, path);
        return func.call(object, ...args);
    };
}

export { methodOf };
