function parseInt(string: string, radix?: number): number;
function parseInt(string: string, radix = 10, guard?: any): number {
    if (guard) {
        radix = 0;
    }
    return (global || self).parseInt(string, +radix || 0);
}

export { parseInt };
