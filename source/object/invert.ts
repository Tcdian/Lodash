import { entries } from './entries';

/* eslint-disable @typescript-eslint/ban-types */
function invert(object: object): Record<string, string> {
    const pairs = entries(object);
    return Object.fromEntries(pairs.map(([key, val]) => [val, key]));
}

export { invert };
