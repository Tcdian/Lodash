import { isObject } from '../lang/isObject';

type Func<TS extends any[], R> = (...args: TS) => R;

function _executeBound(
    func: Func<any[], any>,
    boundFunc: Func<any[], any>,
    thisArg: any,
    context: any,
    args: any[]
): any {
    if (!(context instanceof boundFunc)) {
        return func.call(thisArg, ...args);
    }
    const instance = Object.create(func.prototype);
    const result = func.call(instance, ...args);
    if (isObject(result)) {
        return result;
    }
    return instance;
}

export { _executeBound };
