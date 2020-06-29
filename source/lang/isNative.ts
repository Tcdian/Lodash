import { isFunction } from './isFunction';
const funcProto = Function.prototype;

function isNative(value: any): value is (...args: any[]) => any {
    return isFunction(value) && funcProto.toString.call(value).includes('[native code]');
}

export { isNative };
