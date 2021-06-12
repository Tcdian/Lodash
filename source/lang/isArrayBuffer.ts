import { _baseGetTag } from './_baseGetTag';

function isArrayBuffer(value: any): value is ArrayBuffer {
    return _baseGetTag(value) === '[object ArrayBuffer]';
}

export { isArrayBuffer };
