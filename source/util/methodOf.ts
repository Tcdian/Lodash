import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function methodOf(object: any, ...args: any[]) {
    return function (this: any, path: PropertyPath) {
        const func: (...args: any) => any = get(object, path);
        return func.call(this, ...args);
    };
}

export { methodOf };
