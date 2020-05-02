import _baseGetTag from './_baseGetTag';

function isBoolean(value: any): value is boolean {
    return _baseGetTag(value) === '[object Boolean]';
}

export default isBoolean;
