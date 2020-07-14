import { isObject } from '../lang/isObject';
type func = (...args: any[]) => any;

function _executeBound<T extends func>(func: T, boundFunc: T, thisArgs: any, context: any, args: any[]): ReturnType<T> {
    if (!(context instanceof boundFunc)) {
        return func.call(thisArgs, ...args);
    }
    const instance = Object.create(func.prototype);
    const result: ReturnType<T> = func.call(instance, ...args);
    if (isObject(result)) {
        return result;
    }
    return instance;
}

export { _executeBound };
