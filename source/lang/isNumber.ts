import { _baseGetTag } from './_baseGetTag';

function isNumber(value: any): value is number {
    return _baseGetTag(value) === '[object Number]';
}

export { isNumber };
