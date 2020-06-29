function floor(n: number, precision: number = 0): number {
    const digit = Math.pow(10, precision);
    return Math.floor(n * digit) / digit;
}

export { floor };
