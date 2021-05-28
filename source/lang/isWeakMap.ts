import { _baseGetTag } from './_baseGetTag';

// eslint-disable-next-line @typescript-eslint/ban-types
function isWeakMap(value: any): value is WeakMap<object, any> {
    return _baseGetTag(value) === '[object WeakMap]';
}

export { isWeakMap };
