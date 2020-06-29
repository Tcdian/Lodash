function inRange(number: number, start: number, end: number): boolean;
function inRange(number: number, end: number): boolean;
function inRange(number: number, start: number, end?: number): boolean {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (start > end) {
        [start, end] = [end, start];
    }
    if (number >= start && number < end) {
        return true;
    }
    return false;
}

export { inRange };
