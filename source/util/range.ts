function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
function range(start: number, end?: number, step?: number): number[];
function range(start: number, end?: number, step?: number): number[] {
    const endBoundary = end !== undefined ? end : start;
    const startBoundary = end !== undefined ? start : 0;
    step = step !== undefined ? step : endBoundary > startBoundary ? 1 : -1;
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
