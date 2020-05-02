import _baseGetTag from './_baseGetTag';

function isSymbol(value: any): value is symbol {
    return _baseGetTag(value) === '[object Symbol]';
}

export default isSymbol;
