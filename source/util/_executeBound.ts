import { isObject } from '../lang/isObject';

function _executeBound<T>(
    func: (...args: any[]) => T,
    boundFunc: (...args: any[]) => T,
    thisArg: any,
    context: any,
    args: any[]
): T {
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
