import { get } from '../object/get';

type Func<TS extends any[], R> = (...args: TS) => R;
type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function method(path: PropertyPath, ...args: any[]) {
    return function (object: any): any {
        const func: Func<any[], any> = get(object, path);
        return func.call(object, ...args);
    };
}

export { method };
