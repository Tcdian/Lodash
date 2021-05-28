import { get } from '../object/get';

type Func = (...args: any) => any;
type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function method(path: PropertyPath, ...args: any[]) {
    return function (object: any): any {
        const func: Func = get(object, path);
        return func.call(object, ...args);
    };
}

export { method };
