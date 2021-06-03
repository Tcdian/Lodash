import { isUndefined } from '../lang/isUndefined';

function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
function range(start: number, end?: number, step?: number): number[] {
    const endBoundary = isUndefined(end) ? start : end;
    const startBoundary = isUndefined(end) ? 0 : start;
    step = isUndefined(step) ? (endBoundary > startBoundary ? 1 : -1) : step;
    if (endBoundary > startBoundary && step === 0) {
        return new Array(endBoundary - startBoundary).fill(startBoundary);
    }
    if ((endBoundary - startBoundary) * step <= 0) {
        return [];
    }
    const result = [];
    if (endBoundary > startBoundary) {
        for (let i = startBoundary; i < endBoundary; i += step) {
            result.push(i);
        }
    } else {
        for (let i = startBoundary; i > endBoundary; i += step) {
            result.push(i);
        }
    }
    return result;
}

export { range };
