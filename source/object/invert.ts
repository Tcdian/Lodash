/* eslint-disable @typescript-eslint/ban-types */
function invert(object: object): Record<string, string> {
    const pairs = Object.entries(object);
    return Object.fromEntries(pairs.map(([key, val]) => [val, key]));
}

export { invert };
