import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function method(path: PropertyPath, ...args: any[]) {
    return function (this: any, object: any): any {
        const func: (...args: any) => any = get(object, path);
        return func.call(this, ...args);
    };
}

export { method };
