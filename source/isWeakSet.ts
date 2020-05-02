import _baseGetTag from './_baseGetTag';

function isWeakSet(value: any): value is WeakSet<object> {
    return _baseGetTag(value) === '[object WeakSet]';
}

export default isWeakSet;
