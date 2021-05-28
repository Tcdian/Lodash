// eslint-disable-next-line @typescript-eslint/ban-types
function isObject(value: any): value is object {
    const type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
}

export { isObject };
