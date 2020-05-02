import _baseGetTag from './_baseGetTag';

function isMap(value: any): value is Map<any, any> {
    return _baseGetTag(value) === '[object Map]';
}

export default isMap;
