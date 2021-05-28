import { _baseGetTag } from './_baseGetTag';

// eslint-disable-next-line @typescript-eslint/ban-types
function isWeakSet(value: any): value is WeakSet<object> {
    return _baseGetTag(value) === '[object WeakSet]';
}

export { isWeakSet };
