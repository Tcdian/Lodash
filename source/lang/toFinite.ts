import { isNaN } from './isNaN';

function toFinite(value: any): number {
    if (value === Infinity) {
        return Number.MAX_VALUE;
    }
    if (value === -Infinity) {
        return Number.MIN_VALUE;
    }
    const result = Number(value);
    return isNaN(result) ? 0 : result;
}

export { toFinite };
