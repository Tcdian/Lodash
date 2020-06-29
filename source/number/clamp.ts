function clamp(number: number, lower: number, upper: number): number;
function clamp(number: number, upper: number): number;
function clamp(number: number, lower: number, upper?: number): number {
    if (upper === undefined) {
        upper = lower;
        lower = 0;
    }
    if (number < lower) {
        return lower;
    }
    if (number > upper) {
        return upper;
    }
    return number;
}

export { clamp };
