function parseInt(string: string, radix?: number): number;
function parseInt(string: string, radix = 10, guard?: any): number {
    if (guard) {
        radix = 0;
    }
    return parseInt(string, +radix);
}

export { parseInt };
