import { _baseGetTag } from './_baseGetTag';

const objectProto = Object.prototype;
const funcProto = Function.prototype;

function isPlainObject(value: any): boolean {
    if (_baseGetTag(value) !== '[object Object]') {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    const constructor = objectProto.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (
        typeof constructor === 'function' &&
        constructor instanceof constructor &&
        funcProto.toString.call(Object) === funcProto.toString.call(constructor)
    );
}

export { isPlainObject };
