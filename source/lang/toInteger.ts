import { toFinite } from './toFinite';

function toInteger(value: any): number {
    const result = toFinite(value);
    return result - (result % 1);
}

export { toInteger };
