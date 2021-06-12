const objectProto = Object.prototype;

function isTypedArray(value: any): boolean {
    return /\[object Uint(8|16|32)Array\]/.test(objectProto.toString.call(value));
}

export { isTypedArray };
