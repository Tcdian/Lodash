function sum(array: number[]): number {
    return array.reduce((previous, current) => previous + current, 0);
}

export default sum;
