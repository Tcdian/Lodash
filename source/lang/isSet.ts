import { _baseGetTag } from './_baseGetTag';

function isSet(value: any): value is Set<any> {
    return _baseGetTag(value) === '[object Set]';
}

export { isSet };
