import { isFunction } from './isFunction';

function isNative(value: any): value is (...args: any[]) => any {
    return isFunction(value) && Function.prototype.toString.call(value).includes('[native code]');
}

export { isNative };
