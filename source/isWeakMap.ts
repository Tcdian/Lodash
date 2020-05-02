import _baseGetTag from './_baseGetTag';

function isWeakMap(value: any): value is WeakMap<object, any> {
    return _baseGetTag(value) === '[object WeakMap]';
}

export default isWeakMap;
