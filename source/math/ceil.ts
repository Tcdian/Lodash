function ceil(n: number, precision = 0): number {
    const digit = Math.pow(10, precision);
    return Math.ceil(n * digit) / digit;
}

export { ceil };
