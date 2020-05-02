import _baseGetTag from './_baseGetTag';

function isDate(value: any): value is Date {
    return _baseGetTag(value) === '[object Date]';
}

export default isDate;
