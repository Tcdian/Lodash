function round(n: number, precision: number = 0): number {
    const digit = Math.pow(10, precision);
    return Math.round(n * digit) / digit;
}

export default round;
