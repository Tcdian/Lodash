import _baseGetTag from './_baseGetTag';

function isError(value: any): value is Error {
    return _baseGetTag(value) === '[object Error]';
}

export default isError;
