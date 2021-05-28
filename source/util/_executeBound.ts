import { isObject } from '../lang/isObject';

function _executeBound(
    func: (...args: any[]) => any,
    boundFunc: (...args: any[]) => any,
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
