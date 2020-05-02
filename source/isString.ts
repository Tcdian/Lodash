import _baseGetTag from './_baseGetTag';

function isString(value: any): value is string {
    return _baseGetTag(value) === '[object String]';
}

export default isString;
