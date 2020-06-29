import { _baseGetTag } from './_baseGetTag';

interface ArrayBuffer {
    readonly [Symbol.toStringTag]: string;
}

function isArrayBuffer(value: any): value is ArrayBuffer {
    return _baseGetTag(value) === '[object ArrayBuffer]';
}

export { isArrayBuffer };
