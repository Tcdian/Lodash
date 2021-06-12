type TypeTag =
    | '[object Array]'
    | '[object ArrayBuffer]'
    | '[object AsyncFunction]'
    | '[object Boolean]'
    | '[object Date]'
    | '[object Error]'
    | '[object Function]'
    | '[object GeneratorFunction]'
    | '[object Map]'
    | '[object Null]'
    | '[object Number]'
    | '[object Object]'
    | '[object RegExp]'
    | '[object Set]'
    | '[object String]'
    | '[object Symbol]'
    | '[object Undefined]'
    | '[object WeakMap]'
    | '[object WeakSet]';

function _baseGetTag(value: any): TypeTag {
    return Object.prototype.toString.call(value) as TypeTag;
}

export { _baseGetTag };
