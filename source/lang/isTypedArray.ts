import { _baseGetTag } from './_baseGetTag';

type TypedArray =
    | Int8Array
    | Uint8Array
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array;

function isTypedArray(value: any): value is TypedArray {
    const typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
    return typedArrayPattern.test(_baseGetTag(value));
}

export { isTypedArray };
