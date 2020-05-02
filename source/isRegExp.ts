import _baseGetTag from './_baseGetTag';

function isRegExp(value: any): value is RegExp {
    return _baseGetTag(value) === '[object RegExp]';
}

export default isRegExp;
