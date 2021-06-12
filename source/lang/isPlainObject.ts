import { _baseGetTag } from './_baseGetTag';

function isPlainObject(value: any): boolean {
    if (_baseGetTag(value) !== '[object Object]') {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    const constructor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (
        typeof constructor === 'function' &&
        constructor instanceof constructor &&
        Function.prototype.toString.call(Object) === Function.prototype.toString.call(constructor)
    );
}

export { isPlainObject };
