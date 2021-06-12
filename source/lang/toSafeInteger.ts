import { toInteger } from './toInteger';

function toSafeInteger(value: any): number {
    const result = toInteger(value);
    if (result >= Number.MAX_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER;
    }
    if (result <= Number.MIN_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER;
    }
    return result;
}

export { toSafeInteger };
