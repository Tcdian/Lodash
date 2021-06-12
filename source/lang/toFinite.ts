import { isNaN } from './isNaN';

const MAX_INTEGER = 1.7976931348623157e308;

function toFinite(value: any): number {
    if (value === Infinity) {
        return MAX_INTEGER;
    }
    if (value === -Infinity) {
        return -MAX_INTEGER;
    }
    const result = Number(value);
    return isNaN(result) ? 0 : result;
}

export { toFinite };
