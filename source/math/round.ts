function round(n: number, precision = 0): number {
    const digit = Math.pow(10, precision);
    return Math.round(n * digit) / digit;
}

export { round };
